import {Command} from '../types/Command';
import {StickerCommand} from './sticker.command';
import {ClearCommand} from './clear.command';
import {AddytchannelCommand} from './addytchannel.command';

export const Commands: Command[] = [
    StickerCommand,
    ClearCommand,
    AddytchannelCommand
];
