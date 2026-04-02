import { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";
import { describe, expect, it, vi } from "vitest";

import AccountsList from "../../../src/commands/accounts/list.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("accounts list", () => {
  it("returns accounts as JSON", async () => {
    const data = [
      { balance: "1000.00", currency: "usd", id: 1, name: "Checking", type: "cash" },
      { balance: "5000.00", currency: "usd", id: 2, name: "Savings", type: "cash" },
    ];
    const getAll = vi.fn().mockResolvedValue(data);
    mockClient({ manualAccounts: { getAll } });

    const { result } = await runCommand(AccountsList, ["--json"]);
    expect(result).toEqual(data);
    expect(getAll).toHaveBeenCalledOnce();
  });

  it("formats accounts as a table", async () => {
    const getAll = vi.fn().mockResolvedValue([
      { balance: "1000.00", currency: "usd", id: 1, name: "Checking", status: "active", type: "cash" },
      { balance: "-500.00", currency: "usd", id: 2, name: "Credit Card", status: "active", type: "credit" },
    ]);
    mockClient({ manualAccounts: { getAll } });

    const { stdout } = await runCommand(AccountsList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("accounts/list-table"));
  });

  it("shows empty message when no accounts", async () => {
    mockClient({ manualAccounts: { getAll: vi.fn().mockResolvedValue([]) } });

    const { stdout } = await runCommand(AccountsList, []);
    expect(stdout).toBe("No results.\n");
  });

  it("handles empty result", async () => {
    mockClient({ manualAccounts: { getAll: vi.fn().mockResolvedValue([]) } });

    const { result } = await runCommand(AccountsList, ["--json"]);
    expect(result).toEqual([]);
  });

  it("passes --api-key to LunchMoneyClient", async () => {
    mockClient({ manualAccounts: { getAll: vi.fn().mockResolvedValue([]) } });

    await runCommand(AccountsList, ["--api-key", "my-key", "--json"]);
    expect(LunchMoneyClient).toHaveBeenCalledWith({ apiKey: "my-key" });
  });
});
