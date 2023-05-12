const isImage = (mimetype) =>
  mimetype == "image/jpeg" ||
  mimetype == "image/jpg" ||
  mimetype == "image/png" ||
  mimetype == "image/svg";

module.exports = isImage;
