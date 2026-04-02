import type { Config } from "@oclif/core";

import { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";
import { captureOutput } from "@oclif/test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, vi } from "vitest";

// Mock only the SDK — all application code (key resolution, client factory, commands) runs for real.
vi.mock("@lunch-money/lunch-money-js-v2", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@lunch-money/lunch-money-js-v2")>();
  return { ...actual, LunchMoneyClient: vi.fn() };
});

const __dirname = dirname(fileURLToPath(import.meta.url));

type CommandClass = new (argv: string[], config: unknown) => { _run(): Promise<unknown>; run(): Promise<unknown> };

let _config: Config;

/**
 * Create a proxied oclif Config that overrides configDir to a temporary directory.
 * @param dir
 */
export async function configWithTempDir(dir: string): Promise<Config> {
  const config = await getConfig();
  return new Proxy(config, {
    get(target, property, receiver) {
      if (property === "configDir") return dir;
      return Reflect.get(target, property, receiver);
    },
  });
}

/**
 * Absolute path to a fixture file (e.g. `fixture("accounts/list-table")`).
 * @param name
 */
export function fixture(name: string): string {
  return join(__dirname, "fixtures", `${name}.txt`);
}

/**
 *
 */
export async function getConfig(): Promise<Config> {
  if (!_config) {
    const { Config: OclifConfig } = await import("@oclif/core");
    _config = await OclifConfig.load({ root: join(__dirname, "..") });
  }

  return _config;
}

/**
 * Configure the mocked LunchMoneyClient constructor to return a partial client.
 * @param client
 */
export function mockClient(client: Record<string, Record<string, unknown>>): void {
  vi.mocked(LunchMoneyClient).mockImplementation(() => client as unknown as LunchMoneyClient);
}

/**
 * Run a command class with captureOutput. All application code runs for real.
 * @param Command
 * @param argv
 * @param options
 * @param options.config
 * @param options.raw
 */
export async function runCommand<T = unknown>(
  Command: CommandClass,
  argv: string[],
  options?: { config?: Config; raw?: boolean },
) {
  const config = options?.config ?? (await getConfig());
  return captureOutput<T>(async () => {
    const cmd = new Command(argv, config);
    return (options?.raw ? cmd._run() : cmd.run()) as Promise<T>;
  });
}

/** Create a temporary config directory with cleanup. Used by auth and error tests. */
export function tempConfigDir(): { cleanup: () => void; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "lm-test-"));
  return { cleanup: () => rmSync(dir, { force: true, recursive: true }), dir };
}

let origColumns: number;

beforeEach(() => {
  origColumns = process.stdout.columns;
  process.stdout.columns = 120;
  process.env.LUNCH_MONEY_API_KEY ??= "test-api-key";
});

afterEach(() => {
  process.stdout.columns = origColumns;
  process.exitCode = undefined;
});
