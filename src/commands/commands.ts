import {Command} from '../types/command';
import {HelloCommand} from './hello.command';
import {StickerCommand} from './sticker.command';
import {ClearCommand} from './clear.command';

export const Commands: Command[] = [
    HelloCommand,
    StickerCommand,
    ClearCommand
];
