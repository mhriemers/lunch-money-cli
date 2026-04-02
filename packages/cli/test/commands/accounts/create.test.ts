import { describe, expect, it, vi } from "vitest";

import AccountsCreate from "../../../src/commands/accounts/create.js";
import { mockClient, runCommand } from "../../setup.js";

describe("accounts create", () => {
  it("creates with required flags", async () => {
    const created = { balance: "500.00", id: 99, name: "New", type: "credit" };
    const create = vi.fn().mockResolvedValue(created);
    mockClient({ manualAccounts: { create } });

    const { result } = await runCommand(AccountsCreate, [
      "--name",
      "New",
      "--type",
      "credit",
      "--balance",
      "500.00",
      "--json",
    ]);
    expect(result).toEqual(created);
    const body = create.mock.calls[0][0];
    expect(body).toMatchObject({ balance: "500.00", name: "New", type: "credit" });
  });

  it("maps optional flags to request body", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ manualAccounts: { create } });

    await runCommand(AccountsCreate, [
      "--name",
      "X",
      "--type",
      "cash",
      "--balance",
      "0",
      "--institution-name",
      "Chase",
      "--currency",
      "eur",
      "--json",
    ]);
    const body = create.mock.calls[0][0];
    expect(body.institution_name).toBe("Chase");
    expect(body.currency).toBe("eur");
  });

  it("parses --custom-metadata as JSON", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ manualAccounts: { create } });

    await runCommand(AccountsCreate, [
      "--name",
      "X",
      "--type",
      "cash",
      "--balance",
      "0",
      "--custom-metadata",
      '{"foo":"bar"}',
      "--json",
    ]);
    const body = create.mock.calls[0][0];
    expect(body.custom_metadata).toEqual({ foo: "bar" });
  });

  it("converts closed-on 'null' to null", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ manualAccounts: { create } });

    await runCommand(AccountsCreate, [
      "--name",
      "X",
      "--type",
      "cash",
      "--balance",
      "0",
      "--closed-on",
      "null",
      "--json",
    ]);
    const body = create.mock.calls[0][0];
    expect(body.closed_on).toBe(null);
  });

  it("passes closed-on date value through", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ manualAccounts: { create } });

    await runCommand(AccountsCreate, [
      "--name",
      "X",
      "--type",
      "cash",
      "--balance",
      "0",
      "--closed-on",
      "2025-06-15",
      "--json",
    ]);
    const body = create.mock.calls[0][0];
    expect(body.closed_on).toBe("2025-06-15");
  });

  it("maps --exclude-from-transactions boolean flag", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ manualAccounts: { create } });

    await runCommand(AccountsCreate, [
      "--name",
      "X",
      "--type",
      "cash",
      "--balance",
      "0",
      "--exclude-from-transactions",
      "--json",
    ]);
    const body = create.mock.calls[0][0];
    expect(body.exclude_from_transactions).toBe(true);
  });

  it("maps remaining optional flags", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ manualAccounts: { create } });

    await runCommand(AccountsCreate, [
      "--name",
      "X",
      "--type",
      "cash",
      "--balance",
      "100",
      "--balance-as-of",
      "2025-01-15T12:00:00Z",
      "--display-name",
      "My Account",
      "--external-id",
      "ext-123",
      "--status",
      "active",
      "--subtype",
      "checking",
      "--json",
    ]);
    const body = create.mock.calls[0][0];
    expect(body.balance_as_of).toBe("2025-01-15T12:00:00Z");
    expect(body.display_name).toBe("My Account");
    expect(body.external_id).toBe("ext-123");
    expect(body.status).toBe("active");
    expect(body.subtype).toBe("checking");
  });

  it("omits optional flags from body when not set", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ manualAccounts: { create } });

    await runCommand(AccountsCreate, ["--name", "X", "--type", "cash", "--balance", "0", "--json"]);
    const body = create.mock.calls[0][0];
    expect(body).toEqual({ balance: "0", name: "X", type: "cash" });
  });

  it("shows confirmation message", async () => {
    const create = vi.fn().mockResolvedValue({ id: 101, name: "Visa" });
    mockClient({ manualAccounts: { create } });

    const { stdout } = await runCommand(AccountsCreate, ["--name", "Visa", "--type", "credit", "--balance", "0"]);
    expect(stdout).toBe('Created account "Visa" (ID: 101).\n');
  });
});
