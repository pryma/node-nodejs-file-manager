import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export const processHashCommand = async (commandInfo) => {
    const fileName = commandInfo.subCommand;
    const filePath = resolve(process.cwd(), fileName);
    const hash = await calculateSha256(filePath);
    console.log(hash);
}

const calculateSha256 = async (filePath) => {
    const hash = new Promise((resolve, reject) => {
        const hash = createHash('SHA256');
        const readStream = createReadStream(filePath);
        readStream.on('data', data => hash.update(data))
            .on('end', () => resolve(hash.digest('hex')))
            .on('error', error => reject(error));
    });
    return hash;
}