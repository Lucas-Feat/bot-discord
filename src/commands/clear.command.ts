import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    Collection,
    CommandInteraction,
    Message,
    SelectMenuInteraction
} from 'discord.js';
import {Command} from '../types/Command';

export const ClearCommand: Command = {
    name: 'clear',
    description: 'Supprimer tous les messages du channel',
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
        clearMessage(interaction, numberOfMessageToDelete);
    }
};

export function clearMessage(interaction: CommandInteraction | SelectMenuInteraction, numbersOfMessage: number) {
    interaction.channel.messages
        .fetch({limit: numbersOfMessage})
        .then((messages: Collection<string, Message>) =>
            messages.map((message: Message) => message.delete())
        );
}
