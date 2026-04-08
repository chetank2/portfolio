#!/usr/bin/env node
/**
 * Conditionally copies `private-assets/*` into `dist/assets/` after the Astro
 * build completes. Only runs when `INCLUDE_PROTECTED_CONTENT=true` is set —
 * the default build (including Vercel production) leaves protected assets out
 * of the deployed output entirely.
 *
 * This pairs with `shouldRenderProtectedBody()` in
 * `src/lib/caseStudyProtection.ts`: if the env var is not set, neither the
 * protected markup nor the protected screenshots are shipped.
 */
import { cp, readdir, stat } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const privateRoot = join(repoRoot, "private-assets");
const publicTarget = join(repoRoot, "dist", "assets");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (process.env.INCLUDE_PROTECTED_CONTENT !== "true") {
    console.log(
      "[include-protected-assets] INCLUDE_PROTECTED_CONTENT not set — skipping. Protected assets stay out of dist/.",
    );
    return;
  }

  if (!(await exists(privateRoot))) {
    console.log("[include-protected-assets] no private-assets/ directory found, nothing to copy.");
    return;
  }

  if (!(await exists(publicTarget))) {
    console.log("[include-protected-assets] dist/assets does not exist yet — run astro build first.");
    process.exitCode = 1;
    return;
  }

  const entries = await readdir(privateRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const from = join(privateRoot, entry.name);
    const to = join(publicTarget, entry.name);
    await cp(from, to, { recursive: true });
    console.log(`[include-protected-assets] copied ${entry.name} -> dist/assets/${entry.name}`);
  }
}

main().catch((error) => {
  console.error("[include-protected-assets] failed:", error);
  process.exitCode = 1;
});
