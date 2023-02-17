import {
  ChatInputCommandInteraction,
  CommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";
import { Command, SlashCommand, UserCommand } from "./commandType";
import { overwriteCommands } from "./applicationCommand";

import { ApplicationCommandType } from "discord-api-types/v10";
import { logger } from "../util/logger";
import { pingCommad } from "./impl/ping";

const commands: Command[] = [];

export const initCommands = async () => {
  register(pingCommad);
  await overwriteCommands(commands);
};

export const handleCommand = (interaction: CommandInteraction) => {
  const command = commands.find((cmd) => cmd.name == interaction.commandName);
  if (command) {
    switch (interaction.commandType) {
      case ApplicationCommandType.ChatInput:
        logger.info(
          `/${command.name} Command executed by ${
            interaction.user.tag
          } with options: [${interaction.options.data
            .map((option) => {
              return `${option.name}: ${option.value}`;
            })
            .join(" ")}]`
        );
        (command as SlashCommand).execute(
          interaction as ChatInputCommandInteraction,
          interaction.command!
        );
        break;
      case ApplicationCommandType.User:
        logger.info(
          `User Command '${interaction.commandName}' executed by ${
            interaction.user.tag
          } with user: ${
            (interaction as UserContextMenuCommandInteraction).targetUser.tag
          }`
        );
        (command as UserCommand).execute(
          interaction as UserContextMenuCommandInteraction,
          (interaction as UserContextMenuCommandInteraction).targetUser
        );
    }
  }
};

const register = (command: Command) => {
  commands.push(command);
};
