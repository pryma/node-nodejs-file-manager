import { EOL, cpus, homedir, userInfo, arch } from "node:os";

import { INVALID_INPUT, COLOR_YELLOW, COLLOR_END } from '../common/messages.js';
import { OS_EOL, OS_CPUS_INFO, OS_HOMEDIR, OS_USERNAME, OS_ARCH } from '../common/commands.js';

export const processOsCommand = async (commandInfo) => {
    if (!osCommands.has(commandInfo.subCommand)) {
        console.log(`${COLOR_YELLOW}${INVALID_INPUT}:${COLLOR_END} ${commandInfo.subCommand}`);
        return;
    }
    osCommands.get(commandInfo.subCommand)();
}

const getOsEOL = () => {
    console.log(JSON.stringify(EOL));
}

const getOsCpusInfo = () => {
    const cpusInfo = cpus().map(({model, speed}) => ({
        model,
        speed: speed/1000 + ' GHz'
    }));

    console.log(cpusInfo);
}

const getOsHomedir = () => {
    console.log(homedir());
}

const getOsUsername = () => {
    console.log(userInfo().username);
}

const getOsArchitectureInfo = () => {
    console.log(arch());
}

const osCommands = new Map();
osCommands.set(OS_EOL, getOsEOL);
osCommands.set(OS_CPUS_INFO, getOsCpusInfo);
osCommands.set(OS_HOMEDIR, getOsHomedir);
osCommands.set(OS_USERNAME, getOsUsername);
osCommands.set(OS_ARCH, getOsArchitectureInfo);