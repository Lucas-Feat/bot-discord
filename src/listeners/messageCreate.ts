import {Client, Message} from 'discord.js';
import {default as config} from '../config.json';

export default async function messageCreate(client: Client, message: Message): Promise<void> {
    if (message.author === client.user || message.channel.id !== config.channels.testDatabaseId) return;
};
