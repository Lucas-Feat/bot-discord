import {ApplicationCommandType, Client, CommandInteraction} from 'discord.js';
import {Command} from '../types/command';

export const HelloCommand: Command = {
    name: 'hello',
    description: 'Returns a greeting',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = 'HelloCommand there! 🫡';

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
