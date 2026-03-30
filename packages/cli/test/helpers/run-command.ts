import { captureOutput } from "@oclif/test";
import sinon from "sinon";

import { type MockClient, createMockClient } from "./mock-client.js";
import { getConfig } from "./setup.js";

type CommandClass = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (argv: string[], config: any): { run(): Promise<unknown> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prototype: Record<string, any>;
};

export interface RunResult<T = unknown> {
  client: MockClient;
  createClientStub: sinon.SinonStub;
  error?: Error;
  result: T;
  stderr: string;
  stdout: string;
}

/**
 * Run a command with a mocked LunchMoneyClient.
 *
 * @param Command - The command class imported from src/
 * @param argv - CLI arguments array
 * @param setup - Optional callback to configure the mock client before execution
 * @returns Run result with stdout, stderr, result, and the mock client for assertions
 */
export async function runCommand<T = unknown>(
  Command: CommandClass,
  argv: string[],
  setup?: (client: MockClient) => void,
): Promise<RunResult<T>> {
  const config = await getConfig();
  const client = createMockClient();

  if (setup) {
    setup(client);
  }

  const stub = sinon.stub(Command.prototype, "createClient");
  stub.returns(client);

  // Fix terminal width for deterministic table output
  const origColumns = process.stdout.columns;
  process.stdout.columns = 120;

  try {
    const captured = await captureOutput<T>(async () => {
      const cmd = new Command(argv, config);
      return cmd.run() as Promise<T>;
    });

    return {
      client,
      createClientStub: stub,
      error: captured.error,
      result: captured.result as T,
      stderr: captured.stderr ?? "",
      stdout: captured.stdout ?? "",
    };
  } finally {
    process.stdout.columns = origColumns;
    stub.restore();
  }
}
