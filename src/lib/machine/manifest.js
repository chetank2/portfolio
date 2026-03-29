import fs from "node:fs/promises";
import vm from "node:vm";
import { createRequire } from "node:module";

import ts from "typescript";

import { resolveMachineRepoPath } from "./paths.js";

const moduleCache = new Map();
const requireForVm = createRequire(import.meta.url);

async function readFileIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function loadTranspiledModule(relativePath) {
  const filePath = resolveMachineRepoPath(relativePath);

  if (moduleCache.has(filePath)) {
    return moduleCache.get(filePath);
  }

  const promise = (async () => {
    const sourceText = await readFileIfExists(filePath);

    if (sourceText === null) {
      return null;
    }

    const transpiled = ts.transpileModule(sourceText, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
      fileName: filePath,
    });

    const module = { exports: {} };
    const context = {
      Array,
      Boolean,
      Date,
      Error,
      JSON,
      Map,
      Math,
      Number,
      Object,
      Promise,
      RegExp,
      Set,
      String,
      Symbol,
      console,
      exports: module.exports,
      global,
      globalThis,
      module,
      process,
      require: requireForVm,
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      __filename: filePath,
      __dirname: filePath.slice(0, filePath.lastIndexOf("/")),
    };

    vm.runInNewContext(transpiled.outputText, context, { filename: filePath });
    return module.exports;
  })();

  moduleCache.set(filePath, promise);
  return promise;
}

async function loadExportedValue(relativePath, exportName, { required = false } = {}) {
  const moduleExports = await loadTranspiledModule(relativePath);

  if (!moduleExports) {
    if (required) {
      throw new Error(`Missing machine source file: ${relativePath}`);
    }

    return null;
  }

  if (!(exportName in moduleExports)) {
    if (required) {
      throw new Error(`Missing export ${exportName} in machine source file: ${relativePath}`);
    }

    return null;
  }

  return moduleExports[exportName];
}

async function loadProtectedSlugs() {
  const protectedSlugs = await loadExportedValue("src/lib/caseStudyProtection.ts", "PROTECTED_CASE_STUDY_SLUGS", {
    required: true,
  });

  if (protectedSlugs instanceof Set) {
    return protectedSlugs;
  }

  if (Array.isArray(protectedSlugs)) {
    return new Set(protectedSlugs);
  }

  throw new Error("Protected case study slugs were not parsed as a Set or array.");
}

function normalizeMarkdownCaseStudy(raw, protectedSlugs) {
  const slug = String(raw.slug);
  const inferredProtected = Boolean(raw.protected) || protectedSlugs.has(slug);

  return {
    slug,
    title: String(raw.title ?? slug),
    tagline: String(raw.tagline ?? ""),
    role: String(raw.role ?? ""),
    company: String(raw.company ?? ""),
    timeline: String(raw.timeline ?? ""),
    backHref: String(raw.backHref ?? "/#work"),
    protected: inferredProtected,
    origin: "markdown",
    contentFile: typeof raw.contentFile === "string" ? raw.contentFile : undefined,
    content: undefined,
    bodyIsSerialized: false,
  };
}

function parseStandaloneMeta(study) {
  const role = study.meta?.find((meta) => meta.label === "Role")?.value ?? "";
  const company = study.meta?.find((meta) => meta.label === "Company")?.value ?? "";
  const timeline = study.meta?.find((meta) => meta.label === "Timeline")?.value ?? "";
  const type = study.meta?.find((meta) => meta.label === "Type")?.value ?? "";

  return { role, company, timeline, type };
}

function normalizeStandaloneCaseStudy(raw, protectedSlugs, machineTextBySlug) {
  const slug = String(raw.slug);
  const inferredProtected = Boolean(raw.protected) || protectedSlugs.has(slug);
  const { role, company, timeline } = parseStandaloneMeta(raw);
  const content = machineTextBySlug?.[slug];

  return {
    slug,
    title: String(raw.title ?? slug),
    tagline: String(raw.tagline ?? ""),
    role,
    company: company || String(raw.meta?.find((meta) => meta.label === "Type")?.value ?? ""),
    timeline,
    backHref: String(raw.backHref ?? "/#work"),
    protected: inferredProtected,
    origin: "standalone",
    contentFile: undefined,
    content: typeof content === "string" ? content : "",
    bodyIsSerialized: true,
  };
}

function normalizeStandaloneCollection(rawCollection, protectedSlugs, machineTextBySlug) {
  if (!rawCollection) {
    return [];
  }

  if (Array.isArray(rawCollection)) {
    return rawCollection.map((item) => normalizeStandaloneCaseStudy(item, protectedSlugs, machineTextBySlug));
  }

  if (typeof rawCollection === "object") {
    return Object.values(rawCollection).map((item) => normalizeStandaloneCaseStudy(item, protectedSlugs, machineTextBySlug));
  }

  throw new Error("Standalone case studies must export an array or record.");
}

export async function loadMachineCaseStudies({ includeProtected = false } = {}) {
  const protectedSlugs = await loadProtectedSlugs();
  const markdownCaseStudies = await loadExportedValue("src/data/caseStudies.ts", "caseStudies", {
    required: true,
  });

  if (!Array.isArray(markdownCaseStudies)) {
    throw new Error("caseStudies.ts must export an array named caseStudies.");
  }

  const standaloneCaseStudies = await loadExportedValue("src/data/standaloneCaseStudies.ts", "standaloneCaseStudies");
  const standaloneMachineText = await loadExportedValue(
    "src/data/standaloneCaseStudies.ts",
    "standaloneCaseStudyMachineText"
  );

  const normalizedMarkdown = markdownCaseStudies.map((caseStudy) => normalizeMarkdownCaseStudy(caseStudy, protectedSlugs));
  const normalizedStandalone = normalizeStandaloneCollection(
    standaloneCaseStudies,
    protectedSlugs,
    standaloneMachineText
  );

  const merged = [...normalizedMarkdown, ...normalizedStandalone];
  const uniqueCaseStudies = new Map();

  for (const caseStudy of merged) {
    uniqueCaseStudies.set(caseStudy.slug, caseStudy);
  }

  return Array.from(uniqueCaseStudies.values()).filter(
    (caseStudy) => includeProtected || !caseStudy.protected
  );
}

export async function loadMachineCaseStudyBySlug(slug, options = {}) {
  const caseStudies = await loadMachineCaseStudies(options);
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null;
}

export async function loadMachineCaseStudySlugs(options = {}) {
  const caseStudies = await loadMachineCaseStudies(options);
  return caseStudies.map((caseStudy) => caseStudy.slug);
}
