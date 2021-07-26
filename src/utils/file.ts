import https from 'https';
import fs from 'fs';
import { unlink } from 'fs/promises';

export function downloadFile(dest: string, url: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function (response) {
      response.pipe(file);
      file
        .on('finish', () => {
          file.close();
          resolve(file);
        })
        .on('error', err => {
          unlink(dest).then(() => {
            reject(err.message);
          });
        });
    });
  });
}

export function readDir(dirPath: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, result) => {
      if (err != null) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}

export function getFileInfoFromFilePath(filePath: string) {
  const paths = filePath.split('/');
  const fileNameWithExtension = paths[paths.length - 1];
  const [fileName, extension] = fileNameWithExtension.split('.');
  return {
    fileName,
    extension,
  };
}

export function getFileSizeInBytes(filePath: string) {
  const stats = fs.statSync(filePath);
  return stats.size;
}
