import type { Config } from "@oclif/core";

import { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";
import { captureOutput } from "@oclif/test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, vi } from "vitest";

// Mock only the SDK — all application code (key resolution, client factory, commands) runs for real.
vi.mock("@lunch-money/lunch-money-js-v2", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@lunch-money/lunch-money-js-v2")>();
  return { ...actual, LunchMoneyClient: vi.fn() };
});

const __dirname = dirname(fileURLToPath(import.meta.url));

type CommandClass = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  argv: string[],
  config: any,
) => { _run(): Promise<unknown>; run(): Promise<unknown> };

let _config: Config;

export async function getConfig(): Promise<Config> {
  if (!_config) {
    const { Config: OclifConfig } = await import("@oclif/core");
    _config = await OclifConfig.load({ root: join(__dirname, "..") });
  }

  return _config;
}

/** Configure the mocked LunchMoneyClient constructor to return a partial client. */
export function mockClient(client: Record<string, Record<string, unknown>>): void {
  vi.mocked(LunchMoneyClient).mockImplementation(() => client as unknown as LunchMoneyClient);
}

/** Absolute path to a fixture file (e.g. `fixture("accounts/list-table")`). */
export function fixture(name: string): string {
  return join(__dirname, "fixtures", `${name}.txt`);
}

/** Run a command class with captureOutput. All application code runs for real. */
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
