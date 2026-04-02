import { describe, expect, it, vi } from "vitest";

import PlaidAccountsList from "../../../src/commands/plaid-accounts/list.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("plaid-accounts list", () => {
  it("returns plaid accounts as JSON", async () => {
    const data = [{ id: 1, name: "Chase Checking", type: "depository" }];
    const getAll = vi.fn().mockResolvedValue(data);
    mockClient({ plaidAccounts: { getAll } });

    const { result } = await runCommand(PlaidAccountsList, ["--json"]);
    expect(result).toEqual(data);
    expect(getAll).toHaveBeenCalledOnce();
  });

  it("formats plaid accounts as a table", async () => {
    const getAll = vi.fn().mockResolvedValue([
      {
        balance: "1500.00",
        currency: "usd",
        id: 1,
        institution_name: "Chase",
        name: "Chase Checking",
        status: "active",
        type: "depository",
      },
    ]);
    mockClient({ plaidAccounts: { getAll } });

    const { stdout } = await runCommand(PlaidAccountsList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("plaid-accounts/list-table"));
  });

  it("handles empty result", async () => {
    mockClient({ plaidAccounts: { getAll: vi.fn().mockResolvedValue([]) } });

    const { result } = await runCommand(PlaidAccountsList, ["--json"]);
    expect(result).toEqual([]);
  });
});
