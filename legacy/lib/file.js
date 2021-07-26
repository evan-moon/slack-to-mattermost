const https = require('https');
const fs = require('fs');

function downloadFile (dest, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      response.pipe(file);
      file.on('finish', () => {
        console.log('Download Finished -> ', dest);
        file.close(() => resolve(file));
      }).on('error', (err) => {
        fs.unlink(dest);
        reject(err.message);
      });
    });
  });
}

function readDir (dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, result) => {
      if (err != null) {
        reject(err);
        return;
      }

      resolve(result);
    })
  })
}

module.exports = {
  downloadFile,
  readFile,
  readDir,
}