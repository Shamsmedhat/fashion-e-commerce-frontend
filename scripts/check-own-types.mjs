// `skipLibCheck` is needed because some third-party typings do not compile cleanly, but it also
// skips this project's own `.d.ts` files, so a typo in `src/lib/types/*.d.ts` would never fail
// the type-check. This runs the compiler with library checks on and reports only the errors in
// our own files.
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc");

const { stdout } = spawnSync(
  process.execPath,
  [tsc, "--noEmit", "--incremental", "false", "--skipLibCheck", "false", "--pretty", "false"],
  { encoding: "utf8" },
);

const ownErrors = stdout.split("\n").filter((line) => line.startsWith("src/"));

if (ownErrors.length > 0) {
  console.error(ownErrors.join("\n"));
  process.exit(1);
}

console.log("Own type declarations are valid.");
