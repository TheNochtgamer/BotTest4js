const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

/**
 * @type {import('../types').SlashCommand}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Comandos disponibles'),

  async run(interaction) {
    const embed = new EmbedBuilder().setColor('Random').setTitle('Comandos');
    const guildCommands = await interaction.guild.commands.fetch();
    const commands = !guildCommands.size
      ? await interaction.client.application.commands.fetch()
      : guildCommands;

    const filteredCommands = commands
      .map(command => {
        if (
          //   !!command.defaultMemberPermissions ||
          !interaction.client.commands.get(command.name)
        )
          return null;
        return command;
      })
      .filter(command => !!command);

    embed.setDescription(
      filteredCommands
        .map(command => {
          const subs = command.options.filter(opt => opt.type === 1);

          return subs.length
            ? subs
                .map(
                  sub =>
                    `> </${command.name}:${command.id}> ${sub.name} ${
                      sub.options
                        ?.map(opt =>
                          opt.required ? `<${opt.name}>` : `[${opt.name}]`,
                        )
                        ?.join(' ') ?? ''
                    } -- ${sub.description}`,
                )
                .join('\n')
            : `> </${command.name}:${command.id}> ${command.options
                .map(opt => (opt.required ? `<${opt.name}>` : `[${opt.name}]`))
                .join(' ')} -- ${command.description}`;
        })
        .join('\n'),
    );

    await interaction.reply({
      embeds: [embed],
    });
  },
};
