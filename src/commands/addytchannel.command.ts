import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    Colors,
    CommandInteraction,
    EmbedBuilder
} from 'discord.js';
import {Command} from '../types/Command';
import axios from 'axios';
import {default as config} from '../config.json';
import {saveNewYoutubeChannel} from '../service/youtube.service';

export const AddytchannelCommand: Command = {
    name: 'addytchannel',
    description: 'Add a new Youtube channel to receive notification',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'channelid',
            description: 'ChannelId to add',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            const channelId: string = interaction.options.get('channelid').value.toString();
            await checkValidChannelId(channelId);
            await saveNewYoutubeChannel(channelId);

            const embed = new EmbedBuilder()
                .setColor(Colors.Green)
                .setTitle('La chaine Youtube a bien été ajouté 👌')
                .setDescription('Vous recevrez maintenant directement dans votre channel les notifications de nouvelles vidéos !');
            await interaction.reply({
                ephemeral: true,
                embeds: [embed]
            });
        } catch (e: any) {
            const embed = new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle('L\'id renseigné ne correspond à aucune chaine Youtube existante 😬')
                .setDescription('Vous pouvez retrouver cette information facilement en suivant le lien 👆')
                .setURL('https://commentpicker.com/youtube-channel-id.php');
            await interaction.reply({
                ephemeral: true,
                embeds: [embed]
            });
        }
    }
};

async function checkValidChannelId(channelId: string) {
    await axios
        .get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&key=${config.youtubeConfig.googleAPIKey}`)
        .catch(function (error) {
            if (error.response.status === 400) {
                throw new Error();
            }
        });
}
