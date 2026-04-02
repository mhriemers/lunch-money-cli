import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { getConfigPath, loadConfig, saveConfig } from "../../src/config.js";

describe("config", () => {
  let configDir: string;

  beforeEach(() => {
    configDir = join(tmpdir(), `cli-core-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    mkdirSync(configDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(configDir, { force: true, recursive: true });
  });

  describe("getConfigPath", () => {
    it("returns config.json inside configDir", () => {
      expect(getConfigPath("/some/dir")).toBe("/some/dir/config.json");
    });
  });

  describe("loadConfig", () => {
    it("returns empty object when no config file exists", () => {
      expect(loadConfig(configDir)).toEqual({});
    });

    it("loads existing config", () => {
      writeFileSync(join(configDir, "config.json"), JSON.stringify({ api_key: "abc" }));
      expect(loadConfig(configDir)).toEqual({ api_key: "abc" });
    });
  });

  describe("saveConfig", () => {
    it("creates config file when none exists", () => {
      saveConfig(configDir, { api_key: "abc" });
      const raw = JSON.parse(readFileSync(join(configDir, "config.json"), "utf8"));
      expect(raw).toEqual({ api_key: "abc" });
    });

    it("merges top-level keys", () => {
      saveConfig(configDir, { api_key: "abc" });
      saveConfig(configDir, { plugins: { foo: { x: 1 } } });
      const raw = JSON.parse(readFileSync(join(configDir, "config.json"), "utf8"));
      expect(raw).toEqual({ api_key: "abc", plugins: { foo: { x: 1 } } });
    });

    it("deep merges nested objects", () => {
      saveConfig(configDir, {
        plugins: {
          splitser: { lists: { a: { account_id: 1 } }, username: "user" },
        },
      });
      saveConfig(configDir, {
        plugins: {
          splitser: { access_token: "tok123" },
        },
      });
      const raw = JSON.parse(readFileSync(join(configDir, "config.json"), "utf8"));
      expect(raw.plugins.splitser).toEqual({
        access_token: "tok123",
        lists: { a: { account_id: 1 } },
        username: "user",
      });
    });

    it("preserves other plugins when updating one", () => {
      saveConfig(configDir, {
        plugins: {
          bar: { key: "val2" },
          foo: { key: "val" },
        },
      });
      saveConfig(configDir, {
        plugins: {
          foo: { key: "updated" },
        },
      });
      const raw = JSON.parse(readFileSync(join(configDir, "config.json"), "utf8"));
      expect(raw.plugins.bar.key).toBe("val2");
      expect(raw.plugins.foo.key).toBe("updated");
    });

    it("overwrites non-object values", () => {
      saveConfig(configDir, { api_key: "old" });
      saveConfig(configDir, { api_key: "new" });
      const raw = JSON.parse(readFileSync(join(configDir, "config.json"), "utf8"));
      expect(raw.api_key).toBe("new");
    });

    it("replaces arrays instead of merging them", () => {
      saveConfig(configDir, { plugins: { p: { items: [1, 2, 3] } } });
      saveConfig(configDir, { plugins: { p: { items: [4, 5] } } });
      const raw = JSON.parse(readFileSync(join(configDir, "config.json"), "utf8"));
      expect(raw.plugins.p.items).toEqual([4, 5]);
    });
  });
});
