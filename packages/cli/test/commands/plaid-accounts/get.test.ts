import { describe, expect, it, vi } from "vitest";

import PlaidAccountsGet from "../../../src/commands/plaid-accounts/get.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("plaid-accounts get", () => {
  it("returns plaid account as JSON", async () => {
    const data = { id: 10, name: "Savings", type: "depository" };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ plaidAccounts: { get } });

    const { result } = await runCommand(PlaidAccountsGet, ["10", "--json"]);
    expect(result).toEqual(data);
    expect(get.mock.calls[0][0]).toBe(10);
  });

  it("formats plaid account detail as text", async () => {
    const get = vi.fn().mockResolvedValue({
      balance: "5000.00",
      balance_last_update: "2025-01-15T10:00:00Z",
      currency: "usd",
      date_linked: "2024-06-01",
      display_name: "My Savings",
      id: 10,
      institution_name: "Chase",
      name: "Savings",
      status: "active",
      subtype: "savings",
      type: "depository",
    });
    mockClient({ plaidAccounts: { get } });

    const { stdout } = await runCommand(PlaidAccountsGet, ["10"]);
    await expect(stdout).toMatchFileSnapshot(fixture("plaid-accounts/get-detail"));
  });
});
