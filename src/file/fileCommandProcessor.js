import { resolve, basename } from 'node:path';

import { READ_FILE, ADD_FILE, RENAME_FILE, COPY_FILE, MOVE_FILE, DELETE_FILE } from '../common/commands.js';
import { processFromToSubCommand } from '../util/utils.js'
import { readFile, addFile, renameFile, copyFile, deleteFile } from './files.js';

export const processFileCommand = async (commandInfo) => {
    await fileCommands.get(commandInfo.command)(commandInfo.subCommand);
}

const _readFile = async (subCommand) => {
    const fileName = subCommand;
    const filePath = resolve(process.cwd(), fileName);
    await readFile(filePath);
}

const _addFile = async (subCommand) => {
    const fileName = subCommand;
    const filePath = resolve(process.cwd(), fileName);
    await addFile(filePath);
}

const _renameFile = async (subCommand) => {
    const filePathesInfo = processFromToSubCommand(subCommand);
    if (null == filePathesInfo) {
        return;
    }
    const oldFilePath = resolve(process.cwd(), filePathesInfo.filePathFrom);
    const newFilePath = resolve(process.cwd(), filePathesInfo.filePathTo);
    await renameFile(oldFilePath, newFilePath);
}

const _copyFile = async (subCommand) => {
    const filePathesInfo = processFromToSubCommand(subCommand);
    if (null == filePathesInfo) {
        return;
    }

    const filePathForCopy = resolve(process.cwd(), filePathesInfo.filePathFrom);
    const fileName = basename(filePathForCopy);

    const pathToCopy = resolve(process.cwd(), filePathesInfo.filePathTo, fileName);
    await copyFile(filePathForCopy, pathToCopy);
}

const _moveFile = async (subCommand) => {
    const filePathesInfo = processFromToSubCommand(subCommand);
    if (null == filePathesInfo) {
        return;
    }

    const filePathForMove = resolve(process.cwd(), filePathesInfo.filePathFrom);
    const fileName = basename(filePathForMove);

    const pathToMove = resolve(process.cwd(), filePathesInfo.filePathTo, fileName);
    await copyFile(filePathForMove, pathToMove);
    await deleteFile(filePathForMove);
}

const _deleteFile = async (subCommand) => {
    const fileName = subCommand.trim();
    const filePath = resolve(process.cwd(), fileName);
    await deleteFile(filePath);
}

const fileCommands = new Map();
fileCommands.set(READ_FILE, _readFile);
fileCommands.set(ADD_FILE, _addFile);
fileCommands.set(RENAME_FILE, _renameFile);
fileCommands.set(COPY_FILE, _copyFile);
fileCommands.set(MOVE_FILE, _moveFile);
fileCommands.set(DELETE_FILE, _deleteFile);
