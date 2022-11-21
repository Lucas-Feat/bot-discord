import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    TextChannel
} from 'discord.js';
import {Command} from '../types/Command';
import {getYoutubeChannel, getYoutubeChannelIds} from '../service/youtube.service';
import {YoutubeChannel} from '../types/YoutubeChannel';
import {default as config} from '../config.json';
import {findChannelById} from '../utils/utils';

export const GetYoutubeChannels: Command = {
    name: 'getytchannel',
    description: 'Get all Youtube channels which you\'re subscribed',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.channel.id != config.channels.videos) {
            await interaction.reply({
                content: 'Commande à utiliser sur le channel de Vidéos !',
                ephemeral: true
            });
            return;
        }

        try {
            const channelsIds = await getYoutubeChannelIds();
            const youtubeChannels: YoutubeChannel[] = await Promise.all(channelsIds
                .map(async (channelId: string) => await getYoutubeChannel(channelId)));

            youtubeChannels
                .map(async (youtubeChannel: YoutubeChannel) => {
                    const embed = new EmbedBuilder()
                        .setColor(Colors.Red)
                        .setTitle(youtubeChannel.title)
                        .setDescription(youtubeChannel.description)
                        .setURL(youtubeChannel.url)
                        .setThumbnail(youtubeChannel.thumbnails);

                    await (findChannelById(client, config.channels.videos) as TextChannel).send({
                        embeds: [embed]
                    });
                });
        } catch (e: any) {
            const embed = new EmbedBuilder()
                .setColor(Colors.DarkRed)
                .setTitle('Un problème est survenu 😬 !')
                .setDescription('Veuillez réessayer dans un instant !');
            await interaction.reply({
                ephemeral: true,
                embeds: [embed]
            });
        }
    }
};
