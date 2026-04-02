import { describe, expect, it, vi } from "vitest";

import TransactionsUpdate from "../../../src/commands/transactions/update.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions update", () => {
  it("updates with individual flags", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(
      TransactionsUpdate,
      ["100", "--payee", "Starbucks", "--amount", "5.00", "--status", "reviewed", "--json"],
    );
    const [id, body] = update.mock.calls[0];
    expect(id).toBe(100);
    expect(body.payee).toBe("Starbucks");
    expect(body.amount).toBe("5.00");
    expect(body.status).toBe("reviewed");
  });

  it("uses --data escape hatch", async () => {
    const payload = { amount: "10.00", payee: "FromJSON" };
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(
      TransactionsUpdate,
      ["100", "--data", JSON.stringify(payload), "--payee", "Ignored", "--json"],
    );
    expect(update.mock.calls[0][1]).toEqual(payload);
  });

  it("parses --tag-ids as JSON array", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(TransactionsUpdate, ["100", "--tag-ids", "[1, 2, 3]", "--json"]);
    expect(update.mock.calls[0][1].tag_ids).toEqual([1, 2, 3]);
  });

  it("parses --additional-tag-ids as JSON array", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(
      TransactionsUpdate,
      ["100", "--additional-tag-ids", "[4, 5]", "--json"],
    );
    expect(update.mock.calls[0][1].additional_tag_ids).toEqual([4, 5]);
  });

  it("parses --custom-metadata as JSON", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(
      TransactionsUpdate,
      ["100", "--custom-metadata", '{"k":"v"}', "--json"],
    );
    expect(update.mock.calls[0][1].custom_metadata).toEqual({ k: "v" });
  });

  it("maps remaining optional flags", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(
      TransactionsUpdate,
      [
        "100",
        "--date",
        "2025-03-15",
        "--currency",
        "eur",
        "--category-id",
        "5",
        "--notes",
        "Lunch meeting",
        "--external-id",
        "ext-789",
        "--recurring-id",
        "3",
        "--original-name",
        "RESTAURANT #42",
        "--manual-account-id",
        "10",
        "--plaid-account-id",
        "20",
        "--json",
      ],
    );
    const body = update.mock.calls[0][1];
    expect(body.date).toBe("2025-03-15");
    expect(body.currency).toBe("eur");
    expect(body.category_id).toBe(5);
    expect(body.notes).toBe("Lunch meeting");
    expect(body.external_id).toBe("ext-789");
    expect(body.recurring_id).toBe(3);
    expect(body.original_name).toBe("RESTAURANT #42");
    expect(body.manual_account_id).toBe(10);
    expect(body.plaid_account_id).toBe(20);
  });

  it("forwards empty --notes to clear notes", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(TransactionsUpdate, ["100", "--notes", "", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body.notes).toBe("");
  });

  it("sends empty body when no update flags set", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    await runCommand(TransactionsUpdate, ["100", "--json"]);
    const body = update.mock.calls[0][1];
    expect(body).toEqual({});
  });

  it("shows confirmation message", async () => {
    const update = vi.fn().mockResolvedValue({ id: 100 });
    mockClient({ transactions: { update } });

    const { stdout } = await runCommand(TransactionsUpdate, ["100", "--payee", "X"]);
    expect(stdout).toBe("Updated transaction 100.\n");
  });
});
