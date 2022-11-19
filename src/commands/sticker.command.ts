import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    SelectMenuBuilder,
    SelectMenuInteraction,
    SelectMenuOptionBuilder,
    TextChannel,
    User
} from 'discord.js';
import {Command} from '../types/command';
import {findStickerByValue, Sticker, stickers} from '../types/sticker';
import {clearMessage} from './clear.command';
import {addSticker, getScore} from '../firebase/storage';
import {findUserById} from '../utils/utils';

export let stickerSelectedMember: User;

export const StickerCommand: Command = {
    name: 'sticker',
    description: 'Permet d\'attribuer une stickerte à un membre du serveur',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        stickerSelectedMember = null;
        const menu = new SelectMenuBuilder()
            .setCustomId('member-menu')
            .setPlaceholder('Sélectionner un membre :');

        client.users.cache.map((user: User) => {
            menu.addOptions(new SelectMenuOptionBuilder({
                label: user.username,
                value: user.id
            }));
        });

        await interaction.reply({
            components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents(menu)]
        });
    }
};

export async function selectSticker(client: Client, interaction: SelectMenuInteraction) {
    stickerSelectedMember = findUserById(client, interaction.values[0]);

    const menu = new SelectMenuBuilder()
        .setCustomId('sticker-menu')
        .setPlaceholder('Sélectionner une gommette :');

    stickers.map(sticker => menu.addOptions(
        new SelectMenuOptionBuilder({
            label: sticker.emoji,
            value: sticker.value
        })
    ));

    await interaction.reply({
        components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents(menu)]
    });
}

export async function attributeSticker(client: Client, interaction: SelectMenuInteraction) {
    let sticker: Sticker = stickers.find(sticker => sticker.value === interaction.values[0]);

    await addSticker(client, stickerSelectedMember, sticker);
    clearMessage(interaction, 2);

    const embed = new EmbedBuilder()
        .setTitle('Nouvelle gommette !')
        .setColor(Colors[sticker.value as keyof typeof Colors])
        .setDescription(await displayScore(client, sticker));

    await (interaction.channel as TextChannel).send({
        embeds: [embed]
    });
}

async function displayScore(client: Client, sticker: Sticker): Promise<string> {
    const scores: string[] = await getScore()
        .then(datas => datas.docs.map(doc => {
            const user: User = findUserById(client, doc.id);
            const map = new Map(Object.entries(doc.data()));
            let stickerDisplay: string[] = [];
            for (const stickerScore of map) {
                stickerDisplay.push(`${findStickerByValue(stickerScore[0]).emoji}x${stickerScore[1]}`);
            }
            return `${user.username} : ${stickerDisplay.join(' ')}`;
        }));

    return `${stickerSelectedMember.username} a reçu une nouvelle gommette ${sticker.emoji} !\n\n`
        + `Nouveau score : \n`
        + `${scores.join('\n')}`;
}
