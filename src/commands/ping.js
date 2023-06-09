const { SlashCommandBuilder } = require('discord.js');

/**
 * @type {import('../types').SlashCommand}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Un comando que hace ping'),

  async run(interaction) {
    console.log(`${interaction.user.tag} hizo ping`);
    await interaction.reply({
      ephemeral: true,
      content: `Pong! ${interaction.client.ws.ping}`,
    });
  },
};
