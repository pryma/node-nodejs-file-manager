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

        fileInfoList.reduce((result, item) => {
            const fileInfo = {Name: item.name};
            if (item.isDirectory()) {
                fileInfo.Type = 'directory';
                result.get('directory').push(fileInfo);
            } else if (item.isFile()) {
                fileInfo.Type = 'file';
                result.get('file').push(fileInfo);
            }
            return result;
        }, resultMap);

        console.table(resultMap.get('directory').concat(resultMap.get('file')), ['Name', 'Type']);
}
