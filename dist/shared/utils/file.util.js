"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileFormat = validateFileFormat;
exports.validateFileSize = validateFileSize;
function validateFileFormat(filename, allowedFileFormats) {
    const fileParts = filename.split('.');
    const extension = fileParts[fileParts.length - 1];
    return allowedFileFormats.includes(extension);
}
async function validateFileSize(fileStream, allowedFileSizeInBytes) {
    return new Promise((resolve, reject) => {
        let fileSizeInBytes = 0;
        fileStream
            .on('data', (data) => {
            fileSizeInBytes = data.byteLength;
        })
            .on('end', () => {
            resolve(fileSizeInBytes <= allowedFileSizeInBytes);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
}
//# sourceMappingURL=file.util.js.map