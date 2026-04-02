import { describe, expect, it, vi } from "vitest";

import PlaidAccountsSync from "../../../src/commands/plaid-accounts/sync.js";
import { mockClient, runCommand } from "../../setup.js";

describe("plaid-accounts sync", () => {
  it("triggers sync with no params", async () => {
    const triggerFetch = vi.fn().mockResolvedValue();
    mockClient({ plaidAccounts: { triggerFetch } });

    const { result } = await runCommand(PlaidAccountsSync, ["--json"]);
    expect(result).toEqual({ message: "Plaid sync triggered", success: true });
    expect(triggerFetch).toHaveBeenCalledOnce();
    expect(triggerFetch.mock.calls[0][0]).toEqual({});
  });

  it("maps date range and account ID flags", async () => {
    const triggerFetch = vi.fn().mockResolvedValue();
    mockClient({ plaidAccounts: { triggerFetch } });

    await runCommand(PlaidAccountsSync, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--plaid-account-id",
      "42",
      "--json",
    ]);
    expect(triggerFetch.mock.calls[0][0]).toEqual({
      end_date: "2025-01-31",
      id: 42,
      start_date: "2025-01-01",
    });
  });

  it("shows confirmation message", async () => {
    const triggerFetch = vi.fn().mockResolvedValue();
    mockClient({ plaidAccounts: { triggerFetch } });

    const { stdout } = await runCommand(PlaidAccountsSync, []);
    expect(stdout).toBe("Plaid sync triggered.\n");
  });
});
