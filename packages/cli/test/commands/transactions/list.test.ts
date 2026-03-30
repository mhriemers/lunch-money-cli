/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsList from "../../../src/commands/transactions/list.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("transactions list", () => {
  it("returns transactions as JSON", async () => {
    const data = { transactions: [{ amount: "-4.50", id: 1, payee: "Coffee" }] };
    const { result } = await runCommand(TransactionsList, ["--json"], (c) => {
      c.transactions.getAll.resolves(data);
    });
    expect(result).to.deep.equal(data);
  });

  it("formats transactions as a table", async () => {
    const { stdout } = await runCommand(TransactionsList, [], (c) => {
      c.transactions.getAll.resolves({
        transactions: [
          { amount: "-4.50", currency: "usd", date: "2025-01-15", id: 1, payee: "Coffee", status: "cleared" },
        ],
      });
    });
    expectFixture(stdout, "transactions/list-table");
  });

  it("maps CLI flags to API params", async () => {
    const { client } = await runCommand(TransactionsList, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--category-id",
      "5",
      "--status",
      "reviewed",
      "--limit",
      "100",
      "--json",
    ]);
    expect(client.transactions.getAll.firstCall.args[0]).to.deep.equal({
      category_id: 5,
      end_date: "2025-01-31",
      limit: 100,
      start_date: "2025-01-01",
      status: "reviewed",
    });
  });

  it("maps boolean and pagination flags", async () => {
    const { client } = await runCommand(TransactionsList, [
      "--include-pending",
      "--include-children",
      "--offset",
      "50",
      "--json",
    ]);
    const params = client.transactions.getAll.firstCall.args[0];
    expect(params.include_pending).to.be.true;
    expect(params.include_children).to.be.true;
    expect(params.offset).to.equal(50);
  });

  it("shows pagination message when has_more is true", async () => {
    const { stdout } = await runCommand(TransactionsList, [], (c) => {
      c.transactions.getAll.resolves({
        has_more: true,
        transactions: [
          { amount: "-4.50", currency: "usd", date: "2025-01-15", id: 1, payee: "Coffee", status: "cleared" },
        ],
      });
    });
    expectFixture(stdout, "transactions/list-pagination");
  });

  it("does not show pagination message when has_more is false", async () => {
    const { stdout } = await runCommand(TransactionsList, [], (c) => {
      c.transactions.getAll.resolves({
        has_more: false,
        transactions: [
          { amount: "-4.50", currency: "usd", date: "2025-01-15", id: 1, payee: "Coffee", status: "cleared" },
        ],
      });
    });
    expectFixture(stdout, "transactions/list-no-pagination");
  });
});
