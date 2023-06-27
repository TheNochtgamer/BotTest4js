const path = require('path');
const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

module.exports = class Utils {
  /**
   *
   * @param {import('discord.js').Client} client
   */
  constructor(client) {
    this.client = client;
  }

  async loadFiles(dirName = '') {
    const PATH = path.join(__dirname, '../', dirName);
    const FILES = fs
      .readdirSync(PATH)
      .filter(f => f.endsWith('.js'))
      .map(f => path.join(PATH, f));

    FILES.forEach(f => delete require.cache[require.resolve(f)]);

    return FILES;
  }

  /**
   * Chequea que un snowflake de discord sea valido
   * @param {String} id
   * @returns {Boolean}
   */
  checkId(id = '') {
    return id.length >= 17 && id.length <= 20 && !isNaN(parseInt(id));
  }

  async summitCommands(guildId = process.env.GUILD) {
    if (!this.client.commands.size) return;
    let cmds = null;

    console.log('Subiendo comandos...');
    try {
      if (guildId) {
        if (!this.client.utils.checkId(guildId)) throw new Error('Id invalida');
        const GUILD = this.client.guilds.cache.get(guildId);
        cmds = await GUILD.commands.set(
          this.client.commands.map(cmd => cmd.data),
        );
      } else {
        cmds = await this.client.application.commands.set(
          this.client.commands.map(cmd => cmd.data),
        );
      }
      if (!cmds) throw new Error('No se subio ningun comando');
      console.log(`(/) ${cmds.size} comandos subidos`);
    } catch (error) {
      console.log('Error al intentar subir los comandos', error);
    }
  }

  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   * @param {import('discord.js').EmbedData} embedData
   * @returns {import('discord.js').InteractionResponse|import('discord.js').Message|null}
   */
  async embedReply(interaction, embedData) {
    const embed = new EmbedBuilder(embedData);
    let reply;

    if (typeof embedData.color === 'undefined') {
      embed.setColor('White');
    } else {
      embed.setColor(embedData.color);
    }
    if (typeof embedData.timestamp === 'undefined') embed.setTimestamp();
    if (typeof embedData.footer === 'undefined')
      embed.setFooter({ text: interaction.client.user.username });

    try {
      if (interaction.replied || interaction.deferred) {
        reply = await interaction.editReply({ embeds: [embed] });
      } else {
        reply = await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      console.log(`Error al responder una interaccion`, error);
      return null;
    }
    return reply;
  }
};
