#!/usr/bin/env node

import "dotenv/config";
import * as fs from "fs";
import figlet from "figlet";
import { Command } from "commander";

const commander = new Command();
console.log(figlet.textSync("Recurse"));

commander
  .version("1.0.0")
  .description("Generate fine-tuning datasets using OpenAI LLMs")
  .option("-g, --generate", "Generate datasets and save to mongodb")
  .option(
    "-e, --export-path",
    "Export data from mongodb to <filename>",
    "./conversation.json"
  )
  .option(
    "-c, --config-path",
    "Path to the configuration file",
    "./config.json"
  )
  .parse(process.argv);

const options = commander.opts();
const configFilePath = options["config-path"];

try {
  const config = fs.readFileSync(configFilePath, "utf-8");
  console.log(config);
} catch (error) {
  console.error("An error occurred", error);
  process.exit(1);
}

if (options.generate) {
  console.log("Generating datasets");
  process.exit(1);
}

if (options.export) {
  console.log(`Exporting data to ${options.export}`);
  process.exit(1);
}
