import {Client} from 'discord.js';
import {Commands} from '../commands/commands';
import {handleYoutubeUploads} from '../service/youtube.service';

export default async function ready(client: Client): Promise<void> {
    if (!client.user || !client.application) return;

    await client.application.commands.set(Commands);

    await handleYoutubeUploads(client);

    console.log(`${client.user.username} est en ligne !`);
};
