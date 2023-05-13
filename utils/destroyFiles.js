const { cloudinary } = require("../config");

const destroyFiles = (files) => {
  for (var file in files) {
    cloudinary.uploader.destroy(files[file][0].filename);
  }
};

module.exports = destroyFiles;
