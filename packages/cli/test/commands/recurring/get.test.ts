import { describe, expect, it, vi } from "vitest";

import RecurringGet from "../../../src/commands/recurring/get.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("recurring get", () => {
  it("returns recurring item as JSON", async () => {
    const data = { amount: "15.99", id: 5, payee: "Netflix" };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ recurringItems: { get } });

    const { result } = await runCommand(RecurringGet, ["5", "--json"]);
    expect(result).toEqual(data);
    expect(get.mock.calls[0][0]).toBe(5);
  });

  it("formats recurring item detail as text", async () => {
    const get = vi.fn().mockResolvedValue({
      created_at: "2024-01-01T00:00:00Z",
      description: "Streaming",
      id: 5,
      status: "active",
      transaction_criteria: {
        amount: "15.99",
        anchor_date: "2025-01-15",
        currency: "usd",
        granularity: "monthly",
        payee: "Netflix",
      },
    });
    mockClient({ recurringItems: { get } });

    const { stdout } = await runCommand(RecurringGet, ["5"]);
    await expect(stdout).toMatchFileSnapshot(fixture("recurring/get-detail"));
  });
});
