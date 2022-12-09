import { dirname, sep, resolve } from 'node:path';
import { readdir } from 'node:fs/promises'

export const up = () => {
    const upperPath = dirname(process.cwd());
    process.chdir(upperPath);
}

export const cd = (line) => {

    const splittedLine = line.split(' ');
    if (splittedLine.length !== 2) {
        console.log('Invalid input');
        return;
    }

    const path = splittedLine[1] + sep;
    const newDir = resolve(process.cwd(), path);

    try {
        process.chdir(newDir);
    } catch (error) {
        console.error(error);
        console.log('Operation failed');
    }
}

export const printDir = async () => {
    try {
        const fileInfoList = await readdir(process.cwd(), { withFileTypes: true });
        const fileInfoListForPrint = fileInfoList.map((item) => {
            return getFileInfoForPrint(item);
        });
        console.table(fileInfoListForPrint, ['Name', 'Type']);
    } catch (error) {
        console.error(error);
        console.log('Operation failed');
    }
}

const getFileInfoForPrint = (fileInfo) => {
    let fileType = '';
    if (fileInfo.isDirectory()) {
        fileType = 'directory';
    } else if (fileInfo.isFile()) {
        fileType = 'file';
    } else if (fileInfo.isSymbolicLink()) {
        fileType = 'link';
    }
    
    return {
        Name: fileInfo.name,
        Type: fileType
    };
}
