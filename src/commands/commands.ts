import {Command} from '../types/Command';
import {StickerCommand} from './sticker.command';
import {ClearCommand} from './clear.command';
import {AddytchannelCommand} from './addytchannel.command';
import {GetYoutubeChannels} from './getytchannel.command';
import {DailyCommand} from './daily.command';

export const Commands: Command[] = [
    StickerCommand,
    ClearCommand,
    AddytchannelCommand,
    GetYoutubeChannels,
    DailyCommand
];
