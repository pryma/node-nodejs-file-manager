import readline from 'node:readline';
import { homedir, EOL } from 'node:os';

import { getUsername } from './util/argvs.js';
import { processInput } from './util/processInput.js';

const start = () => {
    const userName = getUsername();
    if (!userName) {
        throw new Error('Operation failed');
    }
    console.log(`Welcome to the File Manager, ${userName}!`)

    const readLineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const homeDir = homedir();
    process.chdir(homeDir);
    readLineInterface.setPrompt(`You are currently in ${homeDir} ${EOL}> `)
    readLineInterface.prompt()

    readLineInterface.on('line', async (line) => {
        await processInput(readLineInterface, line)
        readLineInterface.setPrompt(`You are currently in ${process.cwd()} ${EOL}> `)
        readLineInterface.prompt()
    }).on('close', () => {
        console.log(`Thank you for using File Manager, ${userName}!`)
        readLineInterface.close()
    })
}

start();