import {Client, Message, TextChannel} from "discord.js";
import {firestore} from "../index";
import {default as config} from "../config.json";

export default async function messageCreate(client: Client, message: Message): Promise<void> {
    if (message.author === client.user || message.channel.id !== config.channels.testDatabaseId) return;

    try {
        await firestore.collection('test').add({
            Message: message.content,
            User: message.author.username,
            User_ID: message.author.id
        });
        await (client.channels.cache.get(config.channels.testDatabaseId) as TextChannel).send('That\'s good !');
    } catch (e) {
        console.log(e)
    }
};
