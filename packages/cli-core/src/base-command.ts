import type { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";

import { LunchMoneyError } from "@lunch-money/lunch-money-js-v2";
import { Command, Flags } from "@oclif/core";

import { createClient } from "./client.js";
import { loadConfig } from "./config.js";

export abstract class BaseCommand extends Command {
  static enableJsonFlag = true;

  protected async catch(error: Error & { exitCode?: number }): Promise<void> {
    process.exitCode = error.exitCode ?? 1;

    if (this.jsonEnabled()) {
      const json =
        error instanceof LunchMoneyError ? this.formatErrorJson(error) : { error: error.message ?? String(error) };
      this.logJson(json);
    } else if (error instanceof LunchMoneyError) {
      this.logToStderr(`Error: ${error.message}`);
      if (error.status) this.logToStderr(`  Status: ${error.status}`);
      if (error.errors?.length) {
        for (const detail of error.errors) {
          this.logToStderr(`  - ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
        }
      }
    } else {
      this.logToStderr(`Error: ${error.message ?? String(error)}`);
    }
  }

  protected output<T>(data: T, formatted: string): T {
    this.log(formatted);
    return data;
  }

  private formatErrorJson(error: LunchMoneyError): Record<string, unknown> {
    const output: Record<string, unknown> = { error: error.message };
    if (error.status) output.status = error.status;
    if (error.errors?.length) output.details = error.errors;
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
      throw new Error(
        "No API key found. Provide one via: --api-key flag, LUNCH_MONEY_API_KEY env var, or run 'lm auth'",
      );
    }

    return createClient(key, process.env.LUNCH_MONEY_BASE_URL);
  }
}
