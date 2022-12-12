import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

export const brotliCompress = async (decompressedFilePath, compressedFilePath) => {
    await pipeline(
        createReadStream(decompressedFilePath),
        createBrotliCompress(),
        createWriteStream(compressedFilePath)
    );
};

export const brotliDecompress = async (compressedFilePath, decompressedFilePath) => {
    await pipeline(
        createReadStream(compressedFilePath),
        createBrotliDecompress(),
        createWriteStream(decompressedFilePath)
    );
};