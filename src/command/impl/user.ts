import { SlashCommand } from "../commandType";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord-api-types/v10";
import { getUser } from "../../github/github";
import { EmbedBuilder } from "discord.js";

export const userCommand: SlashCommand = {
  name: "user",
  description: "Displays information about a Github User or Organization",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "name",
      type: ApplicationCommandOptionType.String,
      description: "The Name of the User or Organization",
      required: true,
    },
  ],
  execute: async (interaction) => {
    const name = interaction.options.getString("name")!;
    const user = await getUser(name);
    if (!user) {
      await interaction.reply({
        content: "User or Organization not found!",
        ephemeral: true,
      });
      return;
    }
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: "GitHub",
            url: "https://github.com",
            iconURL:
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          })
          .setTitle(user.login)
          .setURL(user.html_url)
          .setColor("DarkButNotBlack")
          .setThumbnail(user.avatar_url)
          .setDescription(`Github ${user.type} ${user.login}`)
          .addFields(
            {
              name: "Name",
              value: user.login,
            },
            {
              name: "Followers",
              value: user.followers.toString(),
              inline: true,
            },
            {
              name: "Following",
              value: user.following.toString(),
              inline: true,
            },
            {
              name: "Public Repositories",
              value: user.public_repos.toString(),
            },
            {
              name: "Administrator",
              value: user.site_admin.toString(),
            },
            {
              name: "Created At",
              value: `<t:${Math.floor(
                new Date(user.created_at).getTime() / 1000
              )}:D>`,
            }
          )
          .setTimestamp(),
      ],
    });
  },
};
