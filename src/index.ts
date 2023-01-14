import {Client, IntentsBitField} from 'discord.js';
import {config, serviceAccount} from './config';
import listenerLoader from './loaders/listeners.loader';
import admin from 'firebase-admin';

console.log('Bot is starting...');

const intents = new IntentsBitField(3276799);
const client = new Client({
    intents
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.databaseURL
});

export const firestore = admin.firestore();

listenerLoader(client);

client.login(config.token);
