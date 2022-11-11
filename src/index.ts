import { Client } from "discord.js";
import {default as config} from "./config.json";
import listenerLoader from "./loaders/listeners.loader";

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

listenerLoader(client);

client.login(config.token);
