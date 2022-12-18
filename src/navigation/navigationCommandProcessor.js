
import { UP, CHANGE_DIR, PRINT_DIR_CONTENT } from '../common/commands.js';
import { up, changeDir, printDir } from './navigation.js';

export const processNavCommand = async (commandInfo) => {
    await navCommands.get(commandInfo.command)(commandInfo.subCommand);
}

const _changeDir = async (line) => {
    const path = line;
    await changeDir(path);
}

const navCommands = new Map();
navCommands.set(UP, up);
navCommands.set(CHANGE_DIR, _changeDir);
navCommands.set(PRINT_DIR_CONTENT, printDir);
