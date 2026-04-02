import { describe, expect, it, vi } from "vitest";

import TransactionsUnsplit from "../../../src/commands/transactions/unsplit.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions unsplit", () => {
  it("unsplits transaction by ID", async () => {
    const unsplit = vi.fn().mockResolvedValue({ success: true, unsplit_id: 100 });
    mockClient({ transactions: { unsplit } });

    const { result } = await runCommand(TransactionsUnsplit, ["100", "--json"]);
    expect(result).toEqual({ success: true, unsplit_id: 100 });
    expect(unsplit.mock.calls[0][0]).toBe(100);
  });

  it("shows confirmation message", async () => {
    const unsplit = vi.fn().mockResolvedValue({ success: true, unsplit_id: 100 });
    mockClient({ transactions: { unsplit } });

    const { stdout } = await runCommand(TransactionsUnsplit, ["100"]);
    expect(stdout).toBe("Unsplit transaction 100.\n");
  });
});
