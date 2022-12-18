import { EOL } from 'node:os';
import { INVALID_INPUT, COLOR_YELLOW, COLLOR_END } from '../common/messages.js';

export const getUsername = () => {
    const mapArgs = parseArgs(process.argv);
    return mapArgs.get('--username');
}

const parseArgs = () => {
    const inputArgvs = process.argv.slice(2);
    const resultArgsAndVals = inputArgvs.reduce((result, currentValue) => {
        if (currentValue.includes('=')) {
            result.push(currentValue);
        }
        return result;
    }, []);

    const mapArgs = new Map();
    resultArgsAndVals.forEach(value => {
        const argVal = value.split('=');
        mapArgs.set(argVal[0], argVal[1]);
    });
    return mapArgs;
};

export const processFromToSubCommand = (subCommand) => {
    let filePathes;
    if (subCommand.includes(':*:')) {
        filePathes = subCommand.split(':*:');
    } else {
        filePathes = subCommand.split(' ');
    }

    if (filePathes.length != 2) {
        console.log(`${COLOR_YELLOW}${INVALID_INPUT}${COLLOR_END}${EOL}`);
        return null;
    }

    const filePathesInfo = {
        filePathFrom: filePathes[0].trim(),
        filePathTo: filePathes[1].trim()
    }

    return filePathesInfo;
}
