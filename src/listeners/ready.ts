import {Client} from 'discord.js';
import {Commands} from '../commands/commands';
import {getYoutubeChannelIds, handleYoutubeUploads} from '../service/youtube.service';
import schedule from 'node-schedule';

export default async function ready(client: Client): Promise<void> {
    if (!client.user || !client.application) return;

    await client.application.commands.set(Commands);

    await handleYoutubeUploads(client);
    await getYoutubeChannelIds();

    schedule.scheduleJob('0 3 * * *', () => handleYoutubeUploads(client));

    console.log(`${client.user.username} est en ligne !`);
};
