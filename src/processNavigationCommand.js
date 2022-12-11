
import { UP, CHANGE_DIR, PRINT_DIR_CONTENT } from './common/commands.js';
import { up, changeDir, printDir } from './navigation.js';

export const processNavCommand = async (inputLine) => {
    const command = inputLine.split(' ')[0];
    
    const subCommand = inputLine.substring(inputLine.indexOf(command) + command.length).trim();
    await navCommands.get(command)(subCommand);
}

const navCommands = new Map();
navCommands.set(UP, up);
navCommands.set(CHANGE_DIR, changeDir);
navCommands.set(PRINT_DIR_CONTENT, printDir);
