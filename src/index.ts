import {Client, IntentsBitField} from 'discord.js';
import {default as config} from './config.json';
import listenerLoader from './loaders/listeners.loader';
import admin, {ServiceAccount} from 'firebase-admin';
import {default as serviceAccount} from './service-account.json';
import {default as firebaseConfig} from './firebase.json';

console.log('Bot is starting...');
const intents = new IntentsBitField(3276799);
const client = new Client({
    intents
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: firebaseConfig.databaseURL
})

export const auth = admin.auth();
export const firestore = admin.firestore();

listenerLoader(client);

client.login(config.token);
