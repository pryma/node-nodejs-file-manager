import { resolve } from 'node:path';

import { COMPRESS_FILE, DECOMPRESS_FILE } from '../common/commands.js'
import { INVALID_INPUT, COLOR_YELLOW, COLLOR_END } from '../common/messages.js';
import { brotliCompress, brotliDecompress } from './zip.js';

export const processZipCommand = async (commandInfo) => {
    await zipCommands.get(commandInfo.command)(commandInfo.subCommand);
}

const compress = async (subCommand) => {
    const filePathesInfo = processFromToSubCommand(subCommand);
    if (null == filePathesInfo) {
        return;
    }
    const decompressedFilePath = resolve(process.cwd(), filePathesInfo.filePathFrom);
    const compressedFilePath = resolve(process.cwd(), filePathesInfo.filePathTo);
    await brotliCompress(decompressedFilePath, compressedFilePath);
}

const decompress = async (subCommand) => {
    const filePathesInfo = processFromToSubCommand(subCommand);
    if (null == filePathesInfo) {
        return;
    }
    const compressedFilePath = resolve(process.cwd(), filePathesInfo.filePathFrom);
    const decompressedFilePath = resolve(process.cwd(), filePathesInfo.filePathTo);
    await brotliDecompress(compressedFilePath, decompressedFilePath);
}

const processFromToSubCommand = (subCommand) => {
    let filePathes;
    if (subCommand.includes(':')) {
        filePathes = subCommand.split(':');
    } else {
        filePathes = subCommand.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`${COLOR_YELLOW}${INVALID_INPUT}:${COLLOR_END} ${subCommand}`);
        return null;
    }

    const filePathesInfo = {
        filePathFrom: filePathes[0].trim(),
        filePathTo: filePathes[1].trim()
    }

    return filePathesInfo;
}

const zipCommands = new Map();
zipCommands.set(COMPRESS_FILE, compress);
zipCommands.set(DECOMPRESS_FILE, decompress);