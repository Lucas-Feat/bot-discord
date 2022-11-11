import {Client} from "discord.js";
import ready from "../listeners/ready";
import interactionCreate from "../listeners/interactionCreate";

const LISTENERS : any = [
    ready,
    interactionCreate
]

export default (client: Client): void => {
    LISTENERS.forEach((listener: any) => {
        client.on(listener.name, listener.bind(null, client));
        console.log(`Evenement ${listener.name} chargé avec succès !`);
    })
};
