#!/usr/bin/env node
/**
 * Conditionally copies `private-assets/*` into public build assets. Runs when
 * `INCLUDE_PROTECTED_CONTENT=true` is set or when the password lock feature is
 * disabled in `caseStudyProtection.ts`.
 *
 * This pairs with `shouldRenderProtectedBody()` in
 * `src/lib/caseStudyProtection.ts`: if the env var is not set, neither the
 * protected markup nor the protected screenshots are shipped.
 */
import { cp, readFile, readdir, stat } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const privateRoot = join(repoRoot, "private-assets");
const sourceFile = join(repoRoot, "src", "lib", "caseStudyProtection.ts");
const publicAssetTarget = join(repoRoot, "public", "assets");
const distAssetTarget = join(repoRoot, "dist", "assets");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function isPasswordLockDisabled() {
  const source = await readFile(sourceFile, "utf8");
  return /CASE_STUDY_PASSWORD_LOCK_ENABLED\s*=\s*false/.test(source);
}

async function copyPrivateAssetsTo(targetRoot, label) {
  if (!(await exists(targetRoot))) {
    console.log(`[include-protected-assets] ${label} does not exist yet — skipping.`);
    return;
  }

  const entries = await readdir(privateRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const from = join(privateRoot, entry.name);
    const to = join(targetRoot, entry.name);
    await cp(from, to, { recursive: true });
    console.log(`[include-protected-assets] copied ${entry.name} -> ${label}/${entry.name}`);
  }
}

async function main() {
  const shouldIncludeAssets =
    process.env.INCLUDE_PROTECTED_CONTENT === "true" || (await isPasswordLockDisabled());

  if (!shouldIncludeAssets) {
    console.log(
      "[include-protected-assets] password lock enabled and INCLUDE_PROTECTED_CONTENT not set — skipping.",
    );
    return;
  }

  if (!(await exists(privateRoot))) {
    console.log("[include-protected-assets] no private-assets/ directory found, nothing to copy.");
    return;
  }

  await copyPrivateAssetsTo(publicAssetTarget, "public/assets");
  await copyPrivateAssetsTo(distAssetTarget, "dist/assets");
}

main().catch((error) => {
  console.error("[include-protected-assets] failed:", error);
  process.exitCode = 1;
});
