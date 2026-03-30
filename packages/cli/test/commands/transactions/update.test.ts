/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsUpdate from "../../../src/commands/transactions/update.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions update", () => {
  it("updates with individual flags", async () => {
    const { client } = await runCommand(
      TransactionsUpdate,
      ["100", "--payee", "Starbucks", "--amount", "5.00", "--status", "reviewed", "--json"],
      (c) => {
        c.transactions.update.resolves({ id: 100 });
      },
    );
    const [id, body] = client.transactions.update.firstCall.args;
    expect(id).to.equal(100);
    expect(body.payee).to.equal("Starbucks");
    expect(body.amount).to.equal("5.00");
    expect(body.status).to.equal("reviewed");
  });

  it("uses --data escape hatch", async () => {
    const payload = { payee: "FromJSON", amount: "10.00" };
    const { client } = await runCommand(
      TransactionsUpdate,
      ["100", "--data", JSON.stringify(payload), "--payee", "Ignored", "--json"],
      (c) => {
        c.transactions.update.resolves({ id: 100 });
      },
    );
    expect(client.transactions.update.firstCall.args[1]).to.deep.equal(payload);
  });

  it("parses --tag-ids as JSON array", async () => {
    const { client } = await runCommand(TransactionsUpdate, ["100", "--tag-ids", "[1, 2, 3]", "--json"], (c) => {
      c.transactions.update.resolves({ id: 100 });
    });
    expect(client.transactions.update.firstCall.args[1].tag_ids).to.deep.equal([1, 2, 3]);
  });

  it("parses --additional-tag-ids as JSON array", async () => {
    const { client } = await runCommand(
      TransactionsUpdate,
      ["100", "--additional-tag-ids", "[4, 5]", "--json"],
      (c) => {
        c.transactions.update.resolves({ id: 100 });
      },
    );
    expect(client.transactions.update.firstCall.args[1].additional_tag_ids).to.deep.equal([4, 5]);
  });

  it("parses --custom-metadata as JSON", async () => {
    const { client } = await runCommand(
      TransactionsUpdate,
      ["100", "--custom-metadata", '{"k":"v"}', "--json"],
      (c) => {
        c.transactions.update.resolves({ id: 100 });
      },
    );
    expect(client.transactions.update.firstCall.args[1].custom_metadata).to.deep.equal({ k: "v" });
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsUpdate, ["100", "--payee", "X"], (c) => {
      c.transactions.update.resolves({ id: 100 });
    });
    expect(stdout).to.equal("Updated transaction 100.\n");
  });
});
