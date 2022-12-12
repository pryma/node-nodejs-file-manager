import readline from 'node:readline';
import { homedir, EOL } from 'node:os';

import { getUsername } from './util/argvs.js';
import { processInput } from './inputCommandProcessor.js';

const start = async () => {
    const userName = getUsername();
    if (!userName) {
        throw new Error('Operation failed');
    }
    console.log(`\x1b[34mWelcome to the File Manager, ${userName}!\x1b[0m`);

    const homeDir = homedir();
    process.chdir(homeDir);

    const readLineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `\x1b[32mYou are currently in\x1b[0m ${process.cwd()} ${EOL}> `
    });

    
    // readLineInterface.setPrompt(`You are currently in ${homeDir} ${EOL}> `);
    readLineInterface.prompt();

    readLineInterface.on('line', async (line) => {
        await processInput(readLineInterface, line).catch(error => console.log(error));
        // try {
        //     await processInput(readLineInterface, line).catch(error => console.log(error));
        //     // readLineInterface.prompt();
        // } catch(error) {
        //     console.error(error);
        // }
        
        // readLineInterface.setPrompt(`You are currently in ${process.cwd()} ${EOL}> `);
        
    }).on('close', () => {
        console.log(`\x1b[34mThank you for using File Manager, ${userName}!\x1b[0m`);
        process.exit(0);
    });
}

start();