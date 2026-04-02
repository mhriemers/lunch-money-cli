import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Readable } from "node:stream";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import Auth from "../../src/commands/auth.js";
import { configWithTempDir, runCommand, tempConfigDir } from "../setup.js";

/**
 *
 * @param input
 */
function mockStdin(input: string): void {
  const readable = new Readable({
    read() {
      this.push(input + "\n");
      this.push(null);
    },
  });
  Object.defineProperty(process, "stdin", { configurable: true, value: readable });
}

describe("auth", () => {
  let dir: string;
  let cleanup: () => void;
  const originalStdin = process.stdin;

  beforeEach(() => {
    ({ cleanup, dir } = tempConfigDir());
  });

  afterEach(() => {
    Object.defineProperty(process, "stdin", { configurable: true, value: originalStdin });
    cleanup();
  });

  it("saves API token to config file", async () => {
    mockStdin("test-token-123");
    const config = await configWithTempDir(dir);

    await runCommand(Auth, [], { config });

    const saved = JSON.parse(readFileSync(join(dir, "config.json"), "utf8"));
    expect(saved.api_key).toBe("test-token-123");
  });

  it("trims whitespace from token", async () => {
    mockStdin("  spaced-token  ");
    const config = await configWithTempDir(dir);

    await runCommand(Auth, [], { config });

    const saved = JSON.parse(readFileSync(join(dir, "config.json"), "utf8"));
    expect(saved.api_key).toBe("spaced-token");
  });

  it("shows config path in output", async () => {
    mockStdin("test-token");
    const config = await configWithTempDir(dir);

    const { stdout } = await runCommand(Auth, [], { config });

    expect(stdout).toBe(`API token saved to ${join(dir, "config.json")}.\n`);
  });

  it("returns success with config path as JSON", async () => {
    mockStdin("test-token");
    const config = await configWithTempDir(dir);

    const { result } = await runCommand<{ config_path: string; success: boolean }>(Auth, ["--json"], { config });

    expect(result?.success).toBe(true);
    expect(result?.config_path).toBe(join(dir, "config.json"));
  });

  it("throws when no token is provided", async () => {
    mockStdin("");
    const config = await configWithTempDir(dir);

    const { error } = await runCommand(Auth, [], { config });

    expect(error?.message).toBe("No token provided");
  });
});
