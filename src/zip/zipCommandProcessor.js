import { resolve } from 'node:path';

import { COMPRESS_FILE, DECOMPRESS_FILE } from '../common/commands.js'
import { processFromToSubCommand } from '../util/utils.js'
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

const zipCommands = new Map();
zipCommands.set(COMPRESS_FILE, compress);
zipCommands.set(DECOMPRESS_FILE, decompress);