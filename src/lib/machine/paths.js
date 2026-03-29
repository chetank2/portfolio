import path from "node:path";
import { fileURLToPath } from "node:url";

const machineModuleDir = path.dirname(fileURLToPath(import.meta.url));

export const machineRepoRoot = path.resolve(machineModuleDir, "../../..");

export function resolveMachineRepoPath(...segments) {
  return path.join(machineRepoRoot, ...segments);
}
