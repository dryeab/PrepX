const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({ cloudinary: cloudinary });

const isImage = (mimetype) =>
  mimetype == "image/jpeg" ||
  mimetype == "image/jpg" ||
  mimetype == "image/png" ||
  mimetype == "image/svg";

upload.fields([{ maxCount: 1, minCount: 1 }]);

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    var { fieldname, mimetype } = file;
    if (
      (fieldname == "photo" || fieldname == "passport") &&
      isImage(mimetype)
    ) {
      cb(null, true);
    } else if (fieldname == "cv" && mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadFields = (fields) => {
  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).send("Missing field: " + err.field);
        }
        return res.status(500).send("Error uploading files");
      } else {
        next();
      }
    });
  };
};

module.exports = uploadFields;
