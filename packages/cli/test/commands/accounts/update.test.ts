import { describe, expect, it, vi } from "vitest";

import AccountsUpdate from "../../../src/commands/accounts/update.js";
import { mockClient, runCommand } from "../../setup.js";

describe("accounts update", () => {
  it("updates with individual flags", async () => {
    const updated = { id: 42, name: "Renamed" };
    const update = vi.fn().mockResolvedValue(updated);
    mockClient({ manualAccounts: { update } });

    const { result } = await runCommand(AccountsUpdate, [
      "42",
      "--name",
      "Renamed",
      "--institution-name",
      "Chase",
      "--json",
    ]);
    expect(result).toEqual(updated);
    expect(update).toHaveBeenCalledOnce();
    const [id, body] = update.mock.calls[0];
    expect(id).toBe(42);
    expect(body.name).toBe("Renamed");
    expect(body.institution_name).toBe("Chase");
  });

  it("uses --data escape hatch and ignores other flags", async () => {
    const payload = { balance: "999.00", name: "FromJSON" };
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, ["42", "--data", JSON.stringify(payload), "--name", "Ignored", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body).toEqual(payload);
  });

  it("converts closed-on 'null' to null", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, ["42", "--closed-on", "null", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body.closed_on).toBeNull();
  });

  it("converts exclude-from-transactions to boolean", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, ["42", "--exclude-from-transactions", "true", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body.exclude_from_transactions).toBe(true);
  });

  it("parses --custom-metadata as JSON", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, ["42", "--custom-metadata", '{"k":"v"}', "--json"]);
    const body = update.mock.calls[0][1];
    expect(body.custom_metadata).toEqual({ k: "v" });
  });

  it("passes closed-on date value through", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, ["42", "--closed-on", "2025-06-15", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body.closed_on).toBe("2025-06-15");
  });

  it("converts exclude-from-transactions 'false' to boolean false", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, ["42", "--exclude-from-transactions", "false", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body.exclude_from_transactions).toBe(false);
  });

  it("maps remaining optional flags", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, [
      "42",
      "--balance",
      "999.99",
      "--balance-as-of",
      "2025-01-15T12:00:00Z",
      "--currency",
      "eur",
      "--display-name",
      "My Account",
      "--external-id",
      "ext-456",
      "--status",
      "closed",
      "--subtype",
      "savings",
      "--type",
      "cash",
      "--json",
    ]);
    const body = update.mock.calls[0][1];
    expect(body.balance).toBe("999.99");
    expect(body.balance_as_of).toBe("2025-01-15T12:00:00Z");
    expect(body.currency).toBe("eur");
    expect(body.display_name).toBe("My Account");
    expect(body.external_id).toBe("ext-456");
    expect(body.status).toBe("closed");
    expect(body.subtype).toBe("savings");
    expect(body.type).toBe("cash");
  });

  it("sends empty body when no update flags set", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42 });
    mockClient({ manualAccounts: { update } });

    await runCommand(AccountsUpdate, ["42", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body).toEqual({});
  });

  it("shows confirmation message", async () => {
    const update = vi.fn().mockResolvedValue({ id: 42, name: "X" });
    mockClient({ manualAccounts: { update } });

    const { stdout } = await runCommand(AccountsUpdate, ["42", "--name", "X"]);
    expect(stdout).toBe("Updated account 42.\n");
  });
});
