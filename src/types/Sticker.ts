export interface Sticker {
    label: string,
    value: string,
    emoji: string,
    number?: number
}

export const greenSticker: Sticker = {
    label: 'Verte',
    value: 'Green',
    emoji: '🟢'
};

export const redSticker: Sticker = {
    label: 'Rouge',
    value: 'Red',
    emoji: '🔴'
};

export const orangeSticker: Sticker = {
    label: 'Orange',
    value: 'Orange',
    emoji: '🟠'
};

export const blackSticker: Sticker = {
    label: 'Noire',
    value: 'NotQuiteBlack',
    emoji: '⚫️'
};

export const stickers: Sticker[] = [greenSticker, redSticker, orangeSticker, blackSticker];

export function findStickerByValue(value: string): Sticker {
    return stickers.find(sticker => sticker.value === value);
}
