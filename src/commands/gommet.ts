import {ApplicationCommandType, Client, CommandInteraction} from "discord.js";
import {Command} from "../types/command";

export const Gommet: Command = {
    name: "gommet",
    description: "Ajoute une gommette à un membre du serveur",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        client.users.cache.map(user => console.log(user))
    }
};
