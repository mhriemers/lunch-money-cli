/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsCreate from "../../../src/commands/transactions/create.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions create", () => {
  const txJson = JSON.stringify([{ date: "2025-01-15", amount: 42.5, payee: "Coffee" }]);

  it("creates transactions from JSON", async () => {
    const response = { ids: [100] };
    const { result, client } = await runCommand(
      TransactionsCreate,
      ["--transactions", txJson, "--json"],
      (c) => { c.transactions.create.resolves(response); },
    );
    expect(result).to.deep.equal(response);
    const body = client.transactions.create.firstCall.args[0];
    expect(body.transactions).to.deep.equal([{ date: "2025-01-15", amount: 42.5, payee: "Coffee" }]);
  });

  it("maps boolean flags", async () => {
    const { client } = await runCommand(
      TransactionsCreate,
      ["--transactions", txJson, "--apply-rules", "--skip-duplicates", "--skip-balance-update", "--json"],
    );
    const body = client.transactions.create.firstCall.args[0];
    expect(body.apply_rules).to.be.true;
    expect(body.skip_duplicates).to.be.true;
    expect(body.skip_balance_update).to.be.true;
  });

  it("shows count in confirmation message", async () => {
    const { stdout } = await runCommand(
      TransactionsCreate,
      ["--transactions", txJson],
      (c) => { c.transactions.create.resolves({ ids: [1] }); },
    );
    expect(stdout).to.equal("Created 1 transaction(s).\n");
  });

  it("extracts count from transactions array", async () => {
    const { stdout } = await runCommand(
      TransactionsCreate,
      ["--transactions", JSON.stringify([{ date: "2025-01-01", amount: 1 }, { date: "2025-01-02", amount: 2 }])],
      (c) => { c.transactions.create.resolves({ transactions: [{ id: 1 }, { id: 2 }] }); },
    );
    expect(stdout).to.equal("Created 2 transaction(s).\n");
  });
});
