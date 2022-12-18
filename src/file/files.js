import { createReadStream, createWriteStream } from 'node:fs';
import { rename, unlink, open } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

export const readFile = async (fileName) => {
    await new Promise((resolve, reject) => {
        const readStream = createReadStream(fileName, { encoding: 'utf8' });

        readStream.on('data', data => console.log(data));
        readStream.on('end', () => resolve());
        readStream.on('error', (error) => reject(error));
    });
}

export const addFile = async (fileName) => {
    const fileHandler = await open(fileName, 'ax');
    fileHandler.close();
}

export const renameFile = async (oldFilePath, newFilePath) => {
    await rename(oldFilePath, newFilePath);
}

export const copyFile = async (filePathForCopy, pathToCopy) => {
    const readStream = createReadStream(filePathForCopy, { encoding: 'utf8' });
    const writeStream = createWriteStream(pathToCopy);
    await pipeline(readStream, writeStream);
}

export const deleteFile = async (filePathForDelete) => {
    await unlink(filePathForDelete);
}