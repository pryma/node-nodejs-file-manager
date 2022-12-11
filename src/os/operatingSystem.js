import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { OS_EOL, OS_CPUS_INFO, OS_HOMEDIR, OS_USERNAME, OS_ARCH } from '../common/commands.js'

export const processOs = async (osCommand) => {
    if (!osCommands.has(osCommand)) {
        console.log(`\x1b[33mInvalid input:\x1b[0m ${osCommand}`);
        // readLineInterface.prompt();
        return;
    }
    osCommands.get(osCommand)();
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