import { describe, expect, it, vi } from "vitest";

import RecurringList from "../../../src/commands/recurring/list.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("recurring list", () => {
  it("returns recurring items as JSON", async () => {
    const data = [{ amount: "15.99", id: 1, payee: "Netflix" }];
    const getAll = vi.fn().mockResolvedValue(data);
    mockClient({ recurringItems: { getAll } });

    const { result } = await runCommand(RecurringList, ["--json"]);
    expect(result).toEqual(data);
  });

  it("formats recurring items as a table", async () => {
    const getAll = vi.fn().mockResolvedValue([
      {
        description: "Streaming",
        id: 1,
        status: "active",
        transaction_criteria: { amount: "15.99", currency: "usd", payee: "Netflix" },
      },
    ]);
    mockClient({ recurringItems: { getAll } });

    const { stdout } = await runCommand(RecurringList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("recurring/list-table"));
  });

  it("maps date range flags to params", async () => {
    const getAll = vi.fn().mockResolvedValue([]);
    mockClient({ recurringItems: { getAll } });

    await runCommand(RecurringList, ["--start-date", "2025-01-01", "--end-date", "2025-01-31", "--json"]);
    expect(getAll.mock.calls[0][0]).toEqual({
      end_date: "2025-01-31",
      start_date: "2025-01-01",
    });
  });

  it("calls getAll with empty params when no flags", async () => {
    const getAll = vi.fn().mockResolvedValue([]);
    mockClient({ recurringItems: { getAll } });

    await runCommand(RecurringList, ["--json"]);
    expect(getAll.mock.calls[0][0]).toEqual({});
  });
});
