import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const source = fs.readFileSync(
  new URL("../lib/motion-geometry.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { readyToReveal, typographyParallax } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
const bounds = (top, height) => ({ top, height, bottom: top + height });
// Regression: the audit found the old sequence running while only its first line was visible.
assert.equal(readyToReveal(bounds(648, 247), 720, 88, true), false);
assert.equal(readyToReveal(bounds(440, 247), 720, 88, true), true);
assert.equal(
  readyToReveal(bounds(640, 247), 720, 88, false),
  true,
  "Project imagery retains its earlier trigger",
);
assert.equal(readyToReveal(bounds(720, 247), 720, 88, true), false);
assert.equal(
  readyToReveal(bounds(76, 500), 390, 76, true),
  true,
  "Tall headings must remain reachable in short viewports",
);
assert.equal(readyToReveal(bounds(650, 150), 703, 76, true), false);
assert.equal(readyToReveal(bounds(480, 150), 703, 76, true), true);
assert.equal(typographyParallax(720, 272, 720, 88), -21);
assert.equal(typographyParallax(88 - 272, 272, 720, 88), 21);
assert.equal(typographyParallax(1000, 272, 720, 88), -21);
assert.equal(typographyParallax(-1000, 272, 720, 88), 21);
console.log(
  "Motion checks passed: heading visibility regression, image trigger, compact viewports, and complete 42px visible-word parallax range.",
);
