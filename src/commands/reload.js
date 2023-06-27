const { SlashCommandBuilder } = require('discord.js');

/**
 * @type {import('../types').SlashCommand}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Recarga los archivos')
    .setDefaultMemberPermissions(8),
  onlyOwners: true,

  async run(interaction) {
    console.log(`(U) ${interaction.user.tag} esta recargando los archivos...`);
    await interaction.reply({
      ephemeral: true,
      content: `Recargando archivos, porfavor espera...`,
    });

    await Promise.allSettled([
      interaction.client.loadEvents(),
      interaction.client.loadCommands(),
    ]);
    await interaction.client.utils.summitCommands();

    await interaction.editReply({
      content: `Recarga de archivos terminada, resultados en la consola`,
    });
  },
};
