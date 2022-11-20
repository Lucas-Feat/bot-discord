import {firestore} from '../index';
import {Client, User} from 'discord.js';
import moment from 'moment';
import {Sticker} from '../types/Sticker';

const STICKER_COLLECTION: string = 'stickers';
const MEMBER_COLLECTION: string = 'members';

export async function addSticker(client: Client, user: User, sticker: Sticker) {
    const date = moment().format('MM-YYYY').toString();

    try {
        const existingRef = await firestore
            .collection(STICKER_COLLECTION)
            .doc(date)
            .collection(MEMBER_COLLECTION)
            .doc(user.id);

        const refExist = await existingRef.get().then(data => data.exists);

        if (refExist) {
            const lastValue: number = await existingRef.get().then(data => data.get(sticker.value));

            await existingRef.update({
                [sticker.value]: lastValue ? lastValue + 1 : 1
            });
        } else {
            await existingRef.set({
                [sticker.value]: 1
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getScore(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
    const date = moment().format('MM-YYYY').toString();
    try {
        return await firestore
            .collection(STICKER_COLLECTION)
            .doc(date)
            .collection(MEMBER_COLLECTION)
            .get();
    } catch (e) {
        console.log(e);
    }
}


