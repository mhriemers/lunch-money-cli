import type { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";

import { LunchMoneyError } from "@lunch-money/lunch-money-js-v2";
import { Command, Flags } from "@oclif/core";

import { createClient } from "./client.js";
import { loadConfig } from "./config.js";

export abstract class BaseCommand extends Command {
  static enableJsonFlag = true;

  protected async catch(err: Error & { exitCode?: number }): Promise<void> {
    process.exitCode = err.exitCode ?? 1;

    if (this.jsonEnabled()) {
      const json = err instanceof LunchMoneyError ? this.formatErrorJson(err) : { error: err.message ?? String(err) };
      this.logJson(json);
    } else if (err instanceof LunchMoneyError) {
      this.logToStderr(`Error: ${err.message}`);
      if (err.status) this.logToStderr(`  Status: ${err.status}`);
      if (err.errors?.length) {
        for (const detail of err.errors) {
          this.logToStderr(`  - ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
        }
      }
    } else {
      this.logToStderr(`Error: ${err.message ?? String(err)}`);
    }
  }

  protected output<T>(data: T, formatted: string): T {
    this.log(formatted);
    return data;
  }

  private formatErrorJson(err: LunchMoneyError): Record<string, unknown> {
    const output: Record<string, unknown> = { error: err.message };
    if (err.status) output.status = err.status;
    if (err.errors?.length) output.details = err.errors;
    return output;
  }
}

export abstract class ApiCommand extends BaseCommand {
  static override baseFlags = {
    "api-key": Flags.string({
      description: "Lunch Money API token (overrides LUNCH_MONEY_API_KEY env var and saved config)",
      helpGroup: "GLOBAL",
    }),
  };

  protected createClient(apiKey: string | undefined): LunchMoneyClient {
    const key = apiKey ?? process.env.LUNCH_MONEY_API_KEY ?? loadConfig(this.config.configDir).api_key;
    if (!key) {
      throw new Error("No API key found. Provide one via: --api-key flag, LUNCH_MONEY_API_KEY env var, or run 'lm auth'");
    }

    return createClient(key);
  }
}
