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
