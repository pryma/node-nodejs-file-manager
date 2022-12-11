
import { resolve, basename } from 'node:path';

import { READ_FILE, ADD_FILE, RENAME_FILE, COPY_FILE, MOVE_FILE, DELETE_FILE } from './common/commands.js';
import { readFile, addFile, renameFile, copyFile, deleteFile } from '../files.js';

export const processFileCommand = async (inputLine) => {
    const command = inputLine.split(' ')[0];
    
    const subCommand = inputLine.substring(inputLine.indexOf(command) + command.length).trim();
    await mainCommands.get(command)(subCommand);
}

const cat = async (line) => {
    const fileName = line;
    const filePath = resolve(process.cwd(), fileName);
    await readFile(filePath);
}

const add = async (line) => {
    const fileName = line;
    const filePath = resolve(process.cwd(), fileName);
    await addFile(filePath);
}

const rn = async (line) => {
    let filePathes;
    if (line.includes(':')) {
        filePathes = line.split(':');
    } else {
        filePathes = line.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`\x1b[33mInvalid input:\x1b[0m ${line}`);
        return;
    }
    const oldFilePath = resolve(process.cwd(), filePathes[0].trim());
    const newFilePath = resolve(process.cwd(), filePathes[1].trim());
    await renameFile(oldFilePath, newFilePath);
}

const cp = async (line) => {
    let filePathes;
    if (line.includes(':')) {
        filePathes = line.split(':');
    } else {
        filePathes = line.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`\x1b[33mInvalid input:\x1b[0m ${line}`);
        return;
    }

    const filePathForCopy = resolve(process.cwd(), filePathes[0].trim());
    const fileName = basename(filePathForCopy);

    const pathToCopy = resolve(process.cwd(), filePathes[1].trim(), fileName);
    await copyFile(filePathForCopy, pathToCopy);
}

const mv = async (line) => {
    let filePathes;
    if (line.includes(':')) {
        filePathes = line.split(':');
    } else {
        filePathes = line.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`\x1b[33mInvalid input:\x1b[0m ${line}`);
        return;
    }

    const filePathForMove = resolve(process.cwd(), filePathes[0].trim());
    const fileName = basename(filePathForMove);

    const pathToMove = resolve(process.cwd(), filePathes[1].trim(), fileName);
    await copyFile(filePathForMove, pathToMove);
    await deleteFile(filePathForMove);
}

const rm = async (line) => {
    const fileName = line.trim();
    const filePath = resolve(process.cwd(), fileName);
    await deleteFile(filePath);
}

const mainCommands = new Map();
mainCommands.set(READ_FILE, cat);
mainCommands.set(ADD_FILE, add);
mainCommands.set(RENAME_FILE, rn);
mainCommands.set(COPY_FILE, cp);
mainCommands.set(MOVE_FILE, mv);
mainCommands.set(DELETE_FILE, rm);
