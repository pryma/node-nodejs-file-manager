import { dirname, sep, resolve } from 'node:path';
import { readdir } from 'node:fs/promises'

export const up = async () => {
    const upperPath = dirname(process.cwd());
    process.chdir(upperPath);
}

export const changeDir = async (path) => {
    const newDir = resolve(process.cwd(), path + sep);
    process.chdir(newDir);
}

export const printDir = async () => {
    const resultMap = new Map();
    resultMap.set('directory', new Array());
    resultMap.set('file', new Array());

    const fileInfoList = await readdir(process.cwd(), { withFileTypes: true });

    const sortedFileInfoList = fileInfoList.map((value) => {
        return { upName: value.name.toLocaleUpperCase(), valueDirent: value };
    }).sort((a, b) => {
        return a.upName.localeCompare(b.upName);
    });

    sortedFileInfoList.reduce((result, item) => {
        const fileInfo = { Name: item.valueDirent.name };
        if (item.valueDirent.isDirectory()) {
            fileInfo.Type = 'directory';
            result.get('directory').push(fileInfo);
        } else if (item.valueDirent.isFile()) {
            fileInfo.Type = 'file';
            result.get('file').push(fileInfo);
        }
        return result;
    }, resultMap);

    console.table(resultMap.get('directory').concat(resultMap.get('file')), ['Name', 'Type']);
}
