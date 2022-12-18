import readline from 'node:readline';
import { homedir, EOL } from 'node:os';

import { getUsername } from './util/utils.js';
import { processInput } from './inputCommandProcessor.js';
import { INVALID_INPUT, OPERATION_FAILD, COLOR_YELLOW, COLLOR_END, COLOR_RED, COLOR_BLUE, COLOR_GREEN, CURRENTLY_DIR } from './common/messages.js';

const start = async () => {
    try {
        const userName = getUsername();
        if (!userName) {
            console.log(`${COLOR_YELLOW}${INVALID_INPUT}${COLLOR_END}${EOL}`);
            process.exit();
        }
        console.log(`${COLOR_BLUE}Welcome to the File Manager, ${userName}!${COLLOR_END}${EOL}`);


        const homeDir = homedir();
        process.chdir(homeDir);

        const readLineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: `${COLOR_GREEN}${CURRENTLY_DIR}${COLLOR_END} ${process.cwd()}${EOL}> `
        });

        readLineInterface.prompt();

        readLineInterface.on('line', async (line) => {
            await processInput(readLineInterface, line).catch(error => console.log(error));
        }).on('close', () => {
            console.log(`${COLOR_BLUE}Thank you for using File Manager, ${userName}, goodbye!${COLLOR_END}${EOL}`);
            process.exit();
        });
    } catch (error) {
        console.error(`${COLOR_RED}${OPERATION_FAILD}${COLLOR_END}`);
    }

}

start();