import { REST } from "discord.js";
import { DISCORD_TOKEN } from "../util/constants";

export const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
