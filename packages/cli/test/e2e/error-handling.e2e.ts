/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";
import nock from "nock";

const BASE_URL = "http://localhost:19999";
const API_KEY = "test-error-key";

describe("error handling e2e", () => {
  let savedApiKey: string | undefined;
  let savedBaseUrl: string | undefined;

  beforeEach(() => {
    savedApiKey = process.env.LUNCH_MONEY_API_KEY;
    savedBaseUrl = process.env.LUNCH_MONEY_BASE_URL;
    process.env.LUNCH_MONEY_API_KEY = API_KEY;
    process.env.LUNCH_MONEY_BASE_URL = BASE_URL;
  });

  afterEach(() => {
    nock.cleanAll();
    if (savedApiKey) process.env.LUNCH_MONEY_API_KEY = savedApiKey;
    else delete process.env.LUNCH_MONEY_API_KEY;
    if (savedBaseUrl) process.env.LUNCH_MONEY_BASE_URL = savedBaseUrl;
    else delete process.env.LUNCH_MONEY_BASE_URL;
  });

  describe("missing API key", () => {
    it("shows error when no API key is available", async () => {
      delete process.env.LUNCH_MONEY_API_KEY;
      // Point to nock URL so we don't hit a real API if a saved config exists
      process.env.LUNCH_MONEY_BASE_URL = BASE_URL;
      // Use --api-key flag with empty-ish value to bypass saved config
      // Actually test via a command that would need a key but has no saved config
      // Since saved config may exist, test the --api-key flag priority instead
      const { stderr } = await runCommand(["user", "me", "--api-key="]);
      expect(stderr).to.contain("No API key found");
    });

    it("shows error in JSON format when no API key", async () => {
      delete process.env.LUNCH_MONEY_API_KEY;
      process.env.LUNCH_MONEY_BASE_URL = BASE_URL;
      const { stdout } = await runCommand(["user", "me", "--api-key=", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("error").that.contains("No API key found");
    });
  });

  describe("HTTP 401 Unauthorized", () => {
    it("displays authentication error", async () => {
      nock(BASE_URL).get("/me").reply(401, { message: "Unauthorized: Invalid access token." });

      const { stderr } = await runCommand(["user", "me"]);
      expect(stderr).to.contain("Error");
    });

    it("returns error as JSON", async () => {
      nock(BASE_URL).get("/me").reply(401, { message: "Unauthorized: Invalid access token." });

      const { stdout } = await runCommand(["user", "me", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("error");
      expect(data).to.have.property("status", 401);
    });
  });

  describe("HTTP 404 Not Found", () => {
    it("displays not found error for invalid ID", async () => {
      nock(BASE_URL).get("/manual_accounts/999999").reply(404, { message: "Resource not found." });

      const { stderr } = await runCommand(["accounts", "get", "999999"]);
      expect(stderr).to.contain("Error");
    });

    it("returns 404 error as JSON", async () => {
      nock(BASE_URL).get("/manual_accounts/999999").reply(404, { message: "Resource not found." });

      const { stdout } = await runCommand(["accounts", "get", "999999", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("error");
      expect(data).to.have.property("status", 404);
    });
  });

  describe("HTTP 422 Validation Error", () => {
    it("displays validation errors with details", async () => {
      nock(BASE_URL)
        .post("/manual_accounts")
        .reply(422, {
          message: "Validation failed.",
          errors: [{ errMsg: "Name is required" }],
        });

      const { stderr } = await runCommand(["accounts", "create", "--name=Test", "--type=cash", "--balance=100"]);
      expect(stderr).to.contain("Error");
    });

    it("returns validation errors as JSON with details", async () => {
      nock(BASE_URL)
        .post("/manual_accounts")
        .reply(422, {
          message: "Validation failed.",
          errors: [{ errMsg: "Name is required" }],
        });

      const { stdout } = await runCommand([
        "accounts",
        "create",
        "--name=Test",
        "--type=cash",
        "--balance=100",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("error");
      expect(data).to.have.property("status", 422);
      expect(data).to.have.property("details").that.is.an("array");
    });
  });

  describe("HTTP 500 Server Error", () => {
    it("displays server error", async () => {
      nock(BASE_URL).get("/categories").reply(500, { message: "Internal server error." });

      const { stderr } = await runCommand(["categories", "list"]);
      expect(stderr).to.contain("Error");
    });

    it("returns server error as JSON", async () => {
      nock(BASE_URL).get("/categories").reply(500, { message: "Internal server error." });

      const { stdout } = await runCommand(["categories", "list", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("error");
      expect(data).to.have.property("status", 500);
    });
  });

  describe("client-side validation", () => {
    it("rejects invalid JSON in --transactions flag", async () => {
      const { stderr } = await runCommand(["transactions", "create", "--transactions=not-json"]);
      expect(stderr).to.contain("valid JSON");
    });

    it("rejects invalid JSON in --data flag", async () => {
      const { stderr } = await runCommand(["transactions", "update", "1", "--data=not-json"]);
      expect(stderr).to.contain("valid JSON");
    });

    it("requires mandatory flags", async () => {
      const { stderr } = await runCommand(["accounts", "create", "--name=Test"]);
      expect(stderr).to.contain("Missing required flag");
    });

    it("requires argument for get commands", async () => {
      const { stderr } = await runCommand(["accounts", "get"]);
      expect(stderr).to.contain("Missing");
    });
  });
});
