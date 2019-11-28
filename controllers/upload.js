/**
 * controller to handle file upload
 */
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

// set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "public", "uploads"),
  filename: function(req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + nanoid() + path.extname(file.originalname)
    );
  }
});

// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // in byte 10M
}).single("myFile"); // the front end input

function uploadHandler(req, res) {
  upload(req, res, err => {
    if (err) {
      res.render("upload", { msg: err });
    } else {
      console.log(req.file);
      res.render("upload", {
        msg: "File uploaded!",
        file: `uploads/${req.file.path}`
      });
    }
  });
}

module.exports = uploadHandler;
