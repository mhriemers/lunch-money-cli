import { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";
import { describe, expect, it, vi } from "vitest";

import AccountsGet from "../../../src/commands/accounts/get.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("accounts get", () => {
  it("returns account as JSON", async () => {
    const data = { balance: "1234.56", id: 42, name: "Checking", type: "cash" };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ manualAccounts: { get } });

    const { result } = await runCommand(AccountsGet, ["42", "--json"]);
    expect(result).toEqual(data);
    expect(get.mock.calls[0][0]).toBe(42);
  });

  it("formats account detail as text", async () => {
    const data = {
      balance: "1000.00",
      currency: "usd",
      id: 1,
      institution_name: "Chase",
      name: "Checking",
      status: "active",
      type: "cash",
    };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ manualAccounts: { get } });

    const { stdout } = await runCommand(AccountsGet, ["1"]);
    await expect(stdout).toMatchFileSnapshot(fixture("accounts/get-detail"));
  });

  it("passes --api-key to LunchMoneyClient", async () => {
    mockClient({ manualAccounts: { get: vi.fn().mockResolvedValue({}) } });

    await runCommand(AccountsGet, ["1", "--api-key", "k", "--json"]);
    expect(LunchMoneyClient).toHaveBeenCalledWith({ apiKey: "k" });
  });
});
