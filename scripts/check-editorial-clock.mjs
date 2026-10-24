import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

const source = fs.readFileSync(
  new URL("../lib/editorial-clock.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { editorialTimes, formatEditorialTime } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
const instant = new Date("2026-10-24T20:04:00Z");
for (const [zone, expected] of [
  ["Asia/Manila", "04:04 AM"],
  ["America/New_York", "04:04 PM"],
  ["Europe/London", "09:04 PM"],
  ["Australia/Adelaide", "06:34 AM"],
  ["Asia/Kathmandu", "01:49 AM"],
]) {
  const result = editorialTimes(instant, zone);
  assert.equal(
    result.manila.text,
    "04:04 AM",
    "Manila must stay fixed across visitor zones",
  );
  assert.equal(result.visitor.text, expected, zone);
}
assert.equal(
  formatEditorialTime(new Date("2026-10-24T16:00:00Z"), "Asia/Manila").text,
  "12:00 AM",
);
assert.equal(
  formatEditorialTime(new Date("2026-10-25T04:00:00Z"), "Asia/Manila").text,
  "12:00 PM",
);
assert.equal(
  formatEditorialTime(new Date("2026-11-01T05:59:00Z"), "America/New_York")
    .text,
  "01:59 AM",
);
assert.equal(
  formatEditorialTime(new Date("2026-11-01T06:00:00Z"), "America/New_York")
    .text,
  "01:00 AM",
);
console.log(
  "Clock checks passed: five timezones, fixed Manila time, midnight/noon, fractional offsets, and DST rollback.",
);
