import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    CommandInteraction,
    EmbedBuilder,
    ModalBuilder,
    ModalSubmitInteraction,
    TextChannel,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js';
import {Command} from '../types/Command';
import {findChannelById, getUserColor} from '../utils/utils';
import {config} from '../config';
import moment from 'moment';

export const DailyCommand: Command = {
    name: 'daily',
    description: 'Tell to all members what did you do, what will yo do and the any obstacles in you way !',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const yesterday = new TextInputBuilder()
            .setCustomId('yesterday')
            .setLabel('What did you do yesterday ?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const today = new TextInputBuilder()
            .setCustomId('today')
            .setLabel('What will you do today?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const obstacles = new TextInputBuilder()
            .setCustomId('obstacles')
            .setLabel('Are there any obstacles in your way ?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const firstRow = new ActionRowBuilder<TextInputBuilder>().addComponents(yesterday);
        const secondRow = new ActionRowBuilder<TextInputBuilder>().addComponents(today);
        const thirdRow = new ActionRowBuilder<TextInputBuilder>().addComponents(obstacles);

        const modal: ModalBuilder = new ModalBuilder()
            .setCustomId('daily-modal')
            .setTitle('Daily scrum !')
            .addComponents(firstRow, secondRow, thirdRow);

        await interaction.showModal(modal);
    }
};

export async function displayDaily(client: Client, interaction: ModalSubmitInteraction) {
    const yesterday = interaction.fields.getTextInputValue('yesterday');
    const today = interaction.fields.getTextInputValue('today');
    const obstacles = interaction.fields.getTextInputValue('obstacles');

    const channel: TextChannel = findChannelById(client, config.channels.daily) as TextChannel;

    const daily = new EmbedBuilder()
        .setColor(await getUserColor(client, interaction))
        .setTitle(`Nouveau daily du ${moment().locale('fr').format('DD MMMM').toString()}`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setAuthor({iconURL: interaction.user.displayAvatarURL(), name: interaction.user.username})
        .setFields([
            {name: 'What did i do yesterday ?', value: yesterday},
            {name: 'What will i do today ?', value: today},
            {name: 'Is there any obstacles in my way ?', value: obstacles}
        ]);

    await channel.send({
        embeds: [daily]
    });
}
