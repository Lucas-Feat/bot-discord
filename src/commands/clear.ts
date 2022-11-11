import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    Collection,
    CommandInteraction,
    Message,
    TextChannel
} from "discord.js";
import {Command} from "../types/command";

export const Clear: Command = {
    name: "clear",
    description: "Supprimer tous les messages du channel",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantity',
            description: 'Nombre de message à supprimer',
            type: ApplicationCommandOptionType.Integer,
            required: true,
            maxValue: 50,
            minValue: 1
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const numberOfMessageToDelete: number = interaction.options.get('quantity')?.value ? +(interaction.options.get('quantity')?.value) : null;
        const channel: TextChannel = interaction.channel as TextChannel;
        channel.messages
            .fetch({limit: numberOfMessageToDelete})
            .then((messages: Collection<string, Message>) =>
                messages.map((message: Message) => message.delete())
            );
    }
};


