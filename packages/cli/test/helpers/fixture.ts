import { expect } from "chai";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "../fixtures");
const updateMode = process.env.UPDATE_FIXTURES === "1";

/**
 * Assert that `actual` matches the contents of a fixture file.
 *
 * When UPDATE_FIXTURES=1, writes `actual` to the fixture file instead of comparing.
 * This lets you regenerate all fixtures after a formatting change:
 *
 *   UPDATE_FIXTURES=1 npm test -w packages/cli
 *
 * @param actual - The actual output string
 * @param name - Fixture name (e.g. "accounts/list-table"). Stored as test/fixtures/{name}.txt
 */
export function expectFixture(actual: string, name: string): void {
  const filePath = join(fixturesDir, `${name}.txt`);

  if (updateMode) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, actual, "utf-8");
    return;
  }

  let expected: string;
  try {
    expected = readFileSync(filePath, "utf-8");
  } catch {
    throw new Error(
      `Fixture not found: ${filePath}\nRun with UPDATE_FIXTURES=1 to generate it.`,
    );
  }

  expect(actual).to.equal(expected);
}
