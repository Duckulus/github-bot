import { SlashCommand } from "../commandType";
import { ApplicationCommandType } from "discord-api-types/v10";

export const pingCommad: SlashCommand = {
  name: "ping",
  description: "pongs",
  type: ApplicationCommandType.ChatInput,
  options: [],
  execute: async (interaction) => {
    await interaction.reply({
      content: "pong",
      ephemeral: true,
    });
  },
};
