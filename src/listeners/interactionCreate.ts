import {Client, CommandInteraction, Interaction} from 'discord.js';
import {Commands} from '../commands/commands';
import {attributeSticker, selectSticker} from '../commands/sticker.command';

export default async function interactionCreate(client: Client, interaction: Interaction): Promise<void> {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        await handleSlashCommand(client, interaction);
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId === 'member-menu') {
            await selectSticker(client, interaction);
        } else if (interaction.customId === 'sticker-menu') {
            await attributeSticker(client, interaction);
        }
    }
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.reply({content: 'Une erreur est survenue ! 🙃'});
        return;
    }

    slashCommand.run(client, interaction);
};
