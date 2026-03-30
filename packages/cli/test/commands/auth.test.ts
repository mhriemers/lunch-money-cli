/* eslint-disable @typescript-eslint/no-unused-expressions */
import { captureOutput } from "@oclif/test";
import { expect } from "chai";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";

import Auth from "../../src/commands/auth.js";
import { getConfig } from "../helpers/index.js";

function mockStdin(input: string): void {
  const readable = new Readable({
    read() {
      this.push(input + "\n");
      this.push(null);
    },
  });
  Object.defineProperty(process, "stdin", { value: readable, configurable: true });
}

describe("auth", () => {
  let tempDir: string;
  const originalStdin = process.stdin;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "lm-test-"));
  });

  afterEach(() => {
    Object.defineProperty(process, "stdin", { value: originalStdin, configurable: true });
    rmSync(tempDir, { recursive: true, force: true });
  });

  function testConfig() {
    // Proxy to redirect configDir to temp directory
    return getConfig().then(
      (config) =>
        new Proxy(config, {
          get(target, prop, receiver) {
            if (prop === "configDir") return tempDir;
            return Reflect.get(target, prop, receiver);
          },
        }),
    );
  }

  it("saves API token to config file", async () => {
    mockStdin("test-token-123");
    const config = await testConfig();

    await captureOutput(async () => {
      const cmd = new Auth([], config);
      return cmd.run();
    });

    const saved = JSON.parse(readFileSync(join(tempDir, "config.json"), "utf-8"));
    expect(saved.api_key).to.equal("test-token-123");
  });

  it("trims whitespace from token", async () => {
    mockStdin("  spaced-token  ");
    const config = await testConfig();

    await captureOutput(async () => {
      const cmd = new Auth([], config);
      return cmd.run();
    });

    const saved = JSON.parse(readFileSync(join(tempDir, "config.json"), "utf-8"));
    expect(saved.api_key).to.equal("spaced-token");
  });

  it("shows config path in output", async () => {
    mockStdin("test-token");
    const config = await testConfig();

    const { stdout } = await captureOutput(async () => {
      const cmd = new Auth([], config);
      return cmd.run();
    });

    expect(stdout).to.equal(`API token saved to ${join(tempDir, "config.json")}.\n`);
  });

  it("returns success with config path as JSON", async () => {
    mockStdin("test-token");
    const config = await testConfig();

    const { result } = await captureOutput<{ config_path: string; success: boolean }>(async () => {
      const cmd = new Auth(["--json"], config);
      return cmd.run();
    });

    expect(result?.success).to.be.true;
    expect(result?.config_path).to.equal(join(tempDir, "config.json"));
  });

  it("throws when no token is provided", async () => {
    mockStdin("");
    const config = await testConfig();

    const { error } = await captureOutput(async () => {
      const cmd = new Auth([], config);
      return cmd.run();
    });

    expect(error?.message).to.equal("No token provided");
  });
});
