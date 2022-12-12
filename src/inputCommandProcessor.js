import { EOL } from 'node:os';

import { EXIT, UP, CHANGE_DIR, PRINT_DIR_CONTENT, READ_FILE, ADD_FILE, RENAME_FILE, COPY_FILE, MOVE_FILE, DELETE_FILE, OPERATING_SYSTEM, CALC_HASH, COMPRESS_FILE, DECOMPRESS_FILE } from './common/commands.js';
import { INVALID_INPUT, OPERATION_FAILD, COLOR_YELLOW, COLLOR_END, COLOR_RED, COLOR_BLUE, COLOR_GREEN } from './common/messages.js';


import { processNavCommand } from './navigation/navigationCommandProcessor.js';
import { processFileCommand } from './file/fileCommandProcessor.js';
import { processOsCommand } from './os/osCommandProcessor.js';
import { processHashCommand } from './hash/hashCommandProcessor.js'
import { processZipCommand } from './zip/zipCommandProcessor.js';

export const processInput = async (readLineInterface, line) => {
    const inputLine = line.trim();
    const command = inputLine.split(' ')[0];

    if (command === EXIT) {
        readLineInterface.close();
        process.exit();
    }

    if (!mainCommands.has(command)) {
        console.log(`${COLOR_YELLOW}${INVALID_INPUT}:${COLLOR_END} ${command}`);
        readLineInterface.prompt();
        return;
    }

    const subCommand = inputLine.substring(inputLine.indexOf(command) + command.length).trim();

    const commandInfo = {
        command: command,
        subCommand: subCommand
    }

    try {
        await mainCommands.get(command)(commandInfo);
    } catch (error) {
        console.log('ERRRROOOOOOOOOOOOORRRRRRRRRR');
        console.error(`${COLOR_RED}${OPERATION_FAILD}:${COLLOR_END} ${error}`);
    } finally {
        readLineInterface.setPrompt(`${COLOR_GREEN}You are currently in${COLLOR_END} ${process.cwd()} ${EOL}> `);
        readLineInterface.prompt();
    }
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

mainCommands.set(OPERATING_SYSTEM, processOsCommand);

mainCommands.set(CALC_HASH, processHashCommand);

mainCommands.set(COMPRESS_FILE, processZipCommand);
mainCommands.set(DECOMPRESS_FILE, processZipCommand);

mainCommands.set('.exit', exit);