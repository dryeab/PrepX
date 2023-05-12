const multer = require("multer");
const { storage } = require("../config");
const { isImage } = require("../utils");

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

module.exports = upload;
