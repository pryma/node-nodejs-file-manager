import { up, cd, printDir } from '../navigation.js';

export const processInput = async (readLineInterface, line) => {
    const command = line.split(' ')[0];

    switch (command) {
        case 'up':
            up();
            break;
        case 'cd':
            cd(line);
            break;
        case 'ls':
            await printDir();
            break;

        case '.exit':
            readLineInterface.close();
            process.exit();

        default:
            console.log('Invalid input');
            break;
    }
}