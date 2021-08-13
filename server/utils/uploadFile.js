const mongoose = require('mongoose');

async function uploadFile(file) {
  const {
    createReadStream, filename, mimetype, encoding,
  } = await file;
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
  const uploadStream = bucket.openUploadStream(filename);
  const stream = createReadStream();
  await new Promise((resolve, reject) => {
    stream
      .pipe(uploadStream)
      .on('error', reject)
      .on('finish', resolve);
  });
  return {
    id: uploadStream.id, filename, mimetype, encoding,
  };
}

module.exports = uploadFile;
