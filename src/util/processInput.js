import { resolve, basename } from 'node:path';
import { EOL } from 'node:os';

import { INVALID_INPUT, OPERATION_FAILD, COLOR_YELLOW, COLLOR_END, COLOR_RED, COLOR_BLUE, COLOR_GREEN } from '../common/messages.js';
import { EXIT, UP, CHANGE_DIR, PRINT_DIR_CONTENT, READ_FILE, ADD_FILE, RENAME_FILE, COPY_FILE, MOVE_FILE, DELETE_FILE, OPERATING_SYSTEM } from '../common/commands.js';
import { up, changeDir as _cd, printDir } from '../navigation.js';
import { readFile, addFile, renameFile, copyFile, deleteFile } from '../files.js';
import { processOs } from '../os/operatingSystem.js';
import {processNavCommand} from '../processNavigationCommand.js';
import {processFileCommand} from '../processFileCommand.js';

export const processInput = async (readLineInterface, line) => {
    const inputLine = line.trim();
    const command = inputLine.split(' ')[0];
    console.log(command);
    if (command === EXIT) {
        readLineInterface.close();
        process.exit();
    }
    if (!mainCommands.has(command)) {
        console.log(`${COLOR_YELLOW}${INVALID_INPUT}:${COLLOR_END} ${line}`);
        readLineInterface.prompt();
        return;
    }

    const commandDescription = inputLine.substring(inputLine.indexOf(command) + command.length).trim();
    console.log(commandDescription);
    try {
        await mainCommands.get(command)(inputLine);
    } catch (error) {
        console.log('ERRRROOOOOOOOOOOOORRRRRRRRRR');
        console.error(`${COLOR_RED}${OPERATION_FAILD}:${COLLOR_END} ${error}`);
    } finally {
        readLineInterface.setPrompt(`${COLOR_GREEN}You are currently in${COLLOR_END} ${process.cwd()} ${EOL}> `);
        readLineInterface.prompt();
    }


    // readLineInterface.prompt();

    // commands.has(command)
    // switch (command) {
    //     case 'up':
    //         up();
    //         break;
    //     case 'cd':
    //         const splittedLine = path.split(' ');
    //         if (splittedLine.length !== 2) {

    //             return;
    //         }
    //         cd(line);
    //         break;
    //     case 'ls':
    //         await printDir();
    //         break;

    //     // case '.exit':
    //     //     readLineInterface.close();
    //     //     process.exit();

    //     default:
    //         console.log('Invalid input');
    //         break;
    // }
}

const cd = async (commandDescription) => {
    const path = commandDescription;
    await _cd(path);
}

const cat = async (commandDescription) => {
    const fileName = commandDescription;
    const filePath = resolve(process.cwd(), fileName);
    await readFile(filePath);
}

const add = async (commandDescription) => {
    const fileName = commandDescription;
    const filePath = resolve(process.cwd(), fileName);
    await addFile(filePath);
}

const rn = async (commandDescription) => {
    let filePathes;
    if (commandDescription.includes(':')) {
        filePathes = commandDescription.split(':');
    } else {
        filePathes = commandDescription.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`\x1b[33mInvalid input:\x1b[0m ${commandDescription}`);
        return;
    }
    const oldFilePath = resolve(process.cwd(), filePathes[0].trim());
    const newFilePath = resolve(process.cwd(), filePathes[1].trim());
    await renameFile(oldFilePath, newFilePath);
}

const cp = async (commandDescription) => {
    let filePathes;
    if (commandDescription.includes(':')) {
        filePathes = commandDescription.split(':');
    } else {
        filePathes = commandDescription.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`\x1b[33mInvalid input:\x1b[0m ${commandDescription}`);
        return;
    }

    const filePathForCopy = resolve(process.cwd(), filePathes[0].trim());
    const fileName = basename(filePathForCopy);

    const pathToCopy = resolve(process.cwd(), filePathes[1].trim(), fileName);
    await copyFile(filePathForCopy, pathToCopy);
}

const mv = async (commandDescription) => {
    let filePathes;
    if (commandDescription.includes(':')) {
        filePathes = commandDescription.split(':');
    } else {
        filePathes = commandDescription.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`\x1b[33mInvalid input:\x1b[0m ${commandDescription}`);
        return;
    }

    const filePathForMove = resolve(process.cwd(), filePathes[0].trim());
    const fileName = basename(filePathForMove);

    const pathToMove = resolve(process.cwd(), filePathes[1].trim(), fileName);
    await copyFile(filePathForMove, pathToMove);
    await deleteFile(filePathForMove);
}

const rm = async (commandDescription) => {
    const fileName = commandDescription;
    const filePath = resolve(process.cwd(), fileName);
    await deleteFile(filePath);
}

const os = (commandDescription) => {
    processOs(commandDescription);
}

const exit = () => {
    process.exit();
}

const mainCommands = new Map();
mainCommands.set(UP, processNavCommand);
mainCommands.set(CHANGE_DIR, processNavCommand);
mainCommands.set(PRINT_DIR_CONTENT, processNavCommand);

mainCommands.set(READ_FILE, processFileCommand);
mainCommands.set(ADD_FILE, processFileCommand);
mainCommands.set(RENAME_FILE, processFileCommand);
mainCommands.set(COPY_FILE, processFileCommand);
mainCommands.set(MOVE_FILE, processFileCommand);
mainCommands.set(DELETE_FILE, processFileCommand);

mainCommands.set(OPERATING_SYSTEM, processOs);

mainCommands.set('.exit', exit);