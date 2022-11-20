import {Channel, Client, Colors, EmbedBuilder, TextChannel} from 'discord.js';
import moment from 'moment';
import {default as config} from '../config.json';
import axios from 'axios';
import {videoConverter, YoutubeVideo} from '../types/YoutubeVideo';
import {firestore} from '../index';
import {findChannelById} from '../utils/utils';

const YOUTUBE_CHANNEL_COLLECTION: string = 'youtube-channels';

export async function handleYoutubeUploads(client: Client) {
    let stopOnError: boolean = false;
    const interval = setInterval(async () => {
        const channelsIds = await getYoutubeChannelIds();
        const publishedAfter: string = moment().add(-config.youtubeConfig.interval, 'ms').toISOString();
        for (let channelId in channelsIds) {
            await axios
                .get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&publishedAfter=${publishedAfter}&key=${config.youtubeConfig.googleAPIKey}`)
                .then(async res => {
                    if (res.data.pageInfo.totalResults > 0) {
                        await displayNewYoutubeVideo(client, res.data.items);
                    }
                })
                .catch(async function (error) {
                    if (error.response.status === 403) {
                        clearInterval(interval);
                        stopOnError = true;
                    }
                });
            if (stopOnError) {
                const embed = new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setTitle('Le quota de recherches via l\'API Youtube est atteint pour aujourd\'hui 😬')
                    .setDescription(`Quota atteint le ${moment().format('DD-MM-YYYY à HH:mm').toString()}`);

                const channel = findChannelById(client, config.channels.status) as TextChannel;
                await channel.send({
                    embeds: [embed]
                });
                break;
            }
        }
    }, config.youtubeConfig.interval);

}

async function displayNewYoutubeVideo(client: Client, items: any[]) {
    const videos: YoutubeVideo[] = items.map(item => videoConverter.fromJSON(item));
    const channel: TextChannel = client.channels.cache.find((channel: Channel) => channel.id === config.channels.videos) as TextChannel;
    for (const video of videos) {
        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor(Colors.Red)
            .setURL(video.url)
            .setTitle(`📣 Nouvelle vidéo de ${video.channelTitle} : ${video.title} !`)
            .setDescription(video.description)
            .setImage(video.thumbnails);

        await channel.send({
            embeds: [embed]
        });
    }
}

export async function saveNewYoutubeChannel(channelId: string) {
    try {
        await firestore
            .collection(YOUTUBE_CHANNEL_COLLECTION)
            .doc()
            .set({
                channelId
            });
    } catch (e) {
        console.log(e);
    }
}

export async function getYoutubeChannelIds() {
    try {
        const channelsIds = await firestore
            .collection(YOUTUBE_CHANNEL_COLLECTION)
            .get();
        return channelsIds.docs.map(doc => doc.data().channelId);
    } catch (e) {
        console.log(e);
    }
}
