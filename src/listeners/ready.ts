import {Client} from "discord.js";
import {Commands} from "../commands/commands";

export default async function ready(client: Client): Promise<void> {
    if (!client.user || !client.application) return;

    await client.application.commands.set(Commands);
    console.log(`${client.user.username} is online`);
};
