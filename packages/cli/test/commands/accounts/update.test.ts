/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import AccountsUpdate from "../../../src/commands/accounts/update.js";
import { runCommand } from "../../helpers/index.js";

describe("accounts update", () => {
  it("updates with individual flags", async () => {
    const updated = { id: 42, name: "Renamed" };
    const { client, result } = await runCommand(
      AccountsUpdate,
      ["42", "--name", "Renamed", "--institution-name", "Chase", "--json"],
      (c) => {
        c.manualAccounts.update.resolves(updated);
      },
    );
    expect(result).to.deep.equal(updated);
    expect(client.manualAccounts.update.calledOnce).to.be.true;
    const [id, body] = client.manualAccounts.update.firstCall.args;
    expect(id).to.equal(42);
    expect(body.name).to.equal("Renamed");
    expect(body.institution_name).to.equal("Chase");
  });

  it("uses --data escape hatch and ignores other flags", async () => {
    const payload = { balance: "999.00", name: "FromJSON" };
    const { client } = await runCommand(
      AccountsUpdate,
      ["42", "--data", JSON.stringify(payload), "--name", "Ignored", "--json"],
      (c) => {
        c.manualAccounts.update.resolves({ id: 42 });
      },
    );
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body).to.deep.equal(payload);
  });

  it("converts closed-on 'null' to null", async () => {
    const { client } = await runCommand(AccountsUpdate, ["42", "--closed-on", "null", "--json"], (c) => {
      c.manualAccounts.update.resolves({ id: 42 });
    });
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body.closed_on).to.be.null;
  });

  it("converts exclude-from-transactions to boolean", async () => {
    const { client } = await runCommand(
      AccountsUpdate,
      ["42", "--exclude-from-transactions", "true", "--json"],
      (c) => {
        c.manualAccounts.update.resolves({ id: 42 });
      },
    );
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body.exclude_from_transactions).to.be.true;
  });

  it("parses --custom-metadata as JSON", async () => {
    const { client } = await runCommand(AccountsUpdate, ["42", "--custom-metadata", '{"k":"v"}', "--json"], (c) => {
      c.manualAccounts.update.resolves({ id: 42 });
    });
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body.custom_metadata).to.deep.equal({ k: "v" });
  });

  it("passes closed-on date value through", async () => {
    const { client } = await runCommand(AccountsUpdate, ["42", "--closed-on", "2025-06-15", "--json"], (c) => {
      c.manualAccounts.update.resolves({ id: 42 });
    });
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body.closed_on).to.equal("2025-06-15");
  });

  it("converts exclude-from-transactions 'false' to boolean false", async () => {
    const { client } = await runCommand(
      AccountsUpdate,
      ["42", "--exclude-from-transactions", "false", "--json"],
      (c) => {
        c.manualAccounts.update.resolves({ id: 42 });
      },
    );
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body.exclude_from_transactions).to.equal(false);
  });

  it("maps remaining optional flags", async () => {
    const { client } = await runCommand(
      AccountsUpdate,
      [
        "42",
        "--balance", "999.99",
        "--balance-as-of", "2025-01-15T12:00:00Z",
        "--currency", "eur",
        "--display-name", "My Account",
        "--external-id", "ext-456",
        "--status", "closed",
        "--subtype", "savings",
        "--type", "cash",
        "--json",
      ],
      (c) => {
        c.manualAccounts.update.resolves({ id: 42 });
      },
    );
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body.balance).to.equal("999.99");
    expect(body.balance_as_of).to.equal("2025-01-15T12:00:00Z");
    expect(body.currency).to.equal("eur");
    expect(body.display_name).to.equal("My Account");
    expect(body.external_id).to.equal("ext-456");
    expect(body.status).to.equal("closed");
    expect(body.subtype).to.equal("savings");
    expect(body.type).to.equal("cash");
  });

  it("sends empty body when no update flags set", async () => {
    const { client } = await runCommand(AccountsUpdate, ["42", "--json"], (c) => {
      c.manualAccounts.update.resolves({ id: 42 });
    });
    const body = client.manualAccounts.update.firstCall.args[1];
    expect(body).to.deep.equal({});
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(AccountsUpdate, ["42", "--name", "X"], (c) => {
      c.manualAccounts.update.resolves({ id: 42, name: "X" });
    });
    expect(stdout).to.equal("Updated account 42.\n");
  });
});
