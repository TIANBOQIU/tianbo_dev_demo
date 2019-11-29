/**
 * controller to handle file upload
 */
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");
const gulp = require("gulp");
const exec = require("child_process").exec;
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
      return res.render("upload", { msg: err });
    }
    console.log(req.file);
    // generate carbon-now image
    gulp.task("task", function(cb) {
      let carbon_path = path.join(__dirname, "..", "node_modules", ".bin");

      exec();
    });
    res.render("upload", {
      msg: "File uploaded!",
      file: `uploads/${req.file.path}`
    });
  });
}

module.exports = uploadHandler;
