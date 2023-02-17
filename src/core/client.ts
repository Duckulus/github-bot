import { Client, CommandInteraction } from "discord.js";
import { handleCommand, initCommands } from "../command/commandHandler";
import { logger } from "../util/logger";
import { DISCORD_TOKEN } from "../util/constants";

const client = new Client({
  intents: [],
});

export const createClient = async () => {
  await initCommands();

  client.on("ready", () => {
    if (client && client.user) logger.info(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", (interaction) => {
    handleCommand(interaction as CommandInteraction);
  });

  await client.login(DISCORD_TOKEN);
};
