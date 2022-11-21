import {Client, Colors, EmbedBuilder, TextChannel} from 'discord.js';
import moment, {Moment} from 'moment';
import {default as config} from '../config.json';
import axios from 'axios';
import {videoConverter, YoutubeVideo} from '../types/YoutubeVideo';
import {firestore} from '../index';
import {convertXmlToArray, findChannelById} from '../utils/utils';

const YOUTUBE_CHANNEL_COLLECTION: string = 'youtube-channels';

export async function handleYoutubeUploads(client: Client) {
    setInterval(async () => {
        const channelsIds = await getYoutubeChannelIds();
        const publishedAfter: Moment = moment().add(-config.youtubeConfig.interval, 'ms');

        const data = await axios
            .get(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelsIds[0]}`);

        const elements: any[] = convertXmlToArray(data);
        const videos: YoutubeVideo[] = elements
            .map((element: any) => videoConverter.fromXML(element))
            .filter((video: YoutubeVideo) => video.publishedAt.isAfter(publishedAfter));

        videos.map(async (video: YoutubeVideo) => await displayNewYoutubeVideo(client, video));
    }, config.youtubeConfig.interval);
}

async function displayNewYoutubeVideo(client: Client, video: YoutubeVideo) {
    const channel: TextChannel = findChannelById(client, config.channels.videos) as TextChannel;
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
