const { createWriteStream, mkdir } = require('fs');

const storeUpload = async ({ stream, filename, mimetype }) => {
  const path = 'public/logo.png';
  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) => stream
    .pipe(createWriteStream(path))
    .on('finish', () => resolve({
      path, filename, mimetype,
    }))
    .on('error', reject));
};
const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
};

module.exports = {
  Mutation: {
    async logoUpload(_, { logo }) {
      // Creates an images folder in the root directory
      mkdir('public', { recursive: true }, (err) => {
        if (err) throw err;
      });
      // Process upload
      const upload = await processUpload(logo);
      return !!upload;
    },
  },
};
