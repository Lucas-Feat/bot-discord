import {Client, CommandInteraction, Interaction} from "discord.js";
import {Commands} from "../commands/commands";

export default async function interactionCreate(client: Client, interaction: Interaction): Promise<void> {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        await handleSlashCommand(client, interaction);
    }
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({content: "Une erreur est survenue ! 🙃"});
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};
