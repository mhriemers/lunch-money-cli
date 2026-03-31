import type { Config } from "@oclif/core";

import { captureOutput } from "@oclif/test";
import { type SinonStub, stub } from "sinon";

import { createMockClient, type MockClient } from "./mock-client.js";
import { getConfig } from "./setup.js";

type CommandClass = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (argv: string[], config: any): { _run(): Promise<unknown>; run(): Promise<unknown> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prototype: Record<string, any>;
};

export interface RunResult<T = unknown> {
  client: MockClient;
  createClientStub: SinonStub;
  error?: Error;
  result: T;
  stderr: string;
  stdout: string;
}

interface RunOptions {
  /** Override the oclif Config (e.g. to redirect configDir) */
  config?: Config;
  /** If true, call _run() to exercise the catch() error handler */
  raw?: boolean;
}

/**
 * Run a command with a mocked LunchMoneyClient.
 *
 * @param Command - The command class imported from src/
 * @param argv - CLI arguments array
 * @param configure - Optional callback to configure the mock client before execution
 * @param options - Additional options (raw mode, config override)
 * @returns Run result with stdout, stderr, result, and the mock client for assertions
 */
export async function runCommand<T = unknown>(
  Command: CommandClass,
  argv: string[],
  configure?: (client: MockClient) => void,
  options?: RunOptions,
): Promise<RunResult<T>> {
  const config = options?.config ?? (await getConfig());
  const client = createMockClient();

  if (configure) {
    configure(client);
  }

  const createClientStub = stub(Command.prototype, "createClient");
  createClientStub.returns(client);

  // Fix terminal width for deterministic table output
  const origColumns = process.stdout.columns;
  process.stdout.columns = 120;

  try {
    const captured = await captureOutput<T>(async () => {
      const cmd = new Command(argv, config);
      return (options?.raw ? cmd._run() : cmd.run()) as Promise<T>;
    });

    return {
      client,
      createClientStub,
      error: captured.error,
      result: captured.result as T,
      stderr: captured.stderr ?? "",
      stdout: captured.stdout ?? "",
    };
  } finally {
    process.stdout.columns = origColumns;
    createClientStub.restore();
  }
}
