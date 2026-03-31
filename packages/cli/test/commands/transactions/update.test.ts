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
    const payload = { amount: "10.00", payee: "FromJSON" };
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

  it("maps remaining optional flags", async () => {
    const { client } = await runCommand(
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
      (c) => {
        c.transactions.update.resolves({ id: 100 });
      },
    );
    const body = client.transactions.update.firstCall.args[1];
    expect(body.date).to.equal("2025-03-15");
    expect(body.currency).to.equal("eur");
    expect(body.category_id).to.equal(5);
    expect(body.notes).to.equal("Lunch meeting");
    expect(body.external_id).to.equal("ext-789");
    expect(body.recurring_id).to.equal(3);
    expect(body.original_name).to.equal("RESTAURANT #42");
    expect(body.manual_account_id).to.equal(10);
    expect(body.plaid_account_id).to.equal(20);
  });

  it("sends empty body when no update flags set", async () => {
    const { client } = await runCommand(TransactionsUpdate, ["100", "--json"], (c) => {
      c.transactions.update.resolves({ id: 100 });
    });
    const body = client.transactions.update.firstCall.args[1];
    expect(body).to.deep.equal({});
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsUpdate, ["100", "--payee", "X"], (c) => {
      c.transactions.update.resolves({ id: 100 });
    });
    expect(stdout).to.equal("Updated transaction 100.\n");
  });
});
