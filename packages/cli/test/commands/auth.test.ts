import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import Auth from "../../src/commands/auth.js";
import { runCommand } from "../setup.js";

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
  let tempDir: string;
  const originalStdin = process.stdin;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "lm-test-"));
  });

  afterEach(() => {
    Object.defineProperty(process, "stdin", { configurable: true, value: originalStdin });
    rmSync(tempDir, { force: true, recursive: true });
  });

  async function testConfig() {
    const { Config: OclifConfig } = await import("@oclif/core");
    const { dirname } = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const root = join(dirname(fileURLToPath(import.meta.url)), "..");
    const config = await OclifConfig.load({ root });
    return new Proxy(config, {
      get(target, prop, receiver) {
        if (prop === "configDir") return tempDir;
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  it("saves API token to config file", async () => {
    mockStdin("test-token-123");
    const config = await testConfig();

    await runCommand(Auth, [], { config });

    const saved = JSON.parse(readFileSync(join(tempDir, "config.json"), "utf8"));
    expect(saved.api_key).toBe("test-token-123");
  });

  it("trims whitespace from token", async () => {
    mockStdin("  spaced-token  ");
    const config = await testConfig();

    await runCommand(Auth, [], { config });

    const saved = JSON.parse(readFileSync(join(tempDir, "config.json"), "utf8"));
    expect(saved.api_key).toBe("spaced-token");
  });

  it("shows config path in output", async () => {
    mockStdin("test-token");
    const config = await testConfig();

    const { stdout } = await runCommand(Auth, [], { config });

    expect(stdout).toBe(`API token saved to ${join(tempDir, "config.json")}.\n`);
  });

  it("returns success with config path as JSON", async () => {
    mockStdin("test-token");
    const config = await testConfig();

    const { result } = await runCommand<{ config_path: string; success: boolean }>(
      Auth,
      ["--json"],
      { config },
    );

    expect(result?.success).toBe(true);
    expect(result?.config_path).toBe(join(tempDir, "config.json"));
  });

  it("throws when no token is provided", async () => {
    mockStdin("");
    const config = await testConfig();

    const { error } = await runCommand(Auth, [], { config });

    expect(error?.message).toBe("No token provided");
  });
});
