/**
 * controller to handle file upload
 */
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");
const gulp = require("gulp");
const exec = require("child_process").exec;

const image_save_dir = path.join(__dirname, "..", "public", "uploads");
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
    // const carbon_path = path.join(__dirname, "..", "carbon-now-cli", "cli.js");
    // const source = req.file.path;
    // const id = path.parse(source).name.substring(7);
    // const target_name = id;
    const cli_path = path.join("carbon-now-cli", "cli.js");
    const source = path.join("public", "uploads", req.file.filename);
    const save_dir = path.join("public", "saved");
    const id = path.parse(source).name.substring(7);
    exec(
      "node " + cli_path + " " + source + " -l " + save_dir + " -t " + id,
      (err, stdout, stderr) => {
        if (err) {
          return console.log(err);
        }
        console.log("finish!");
        res.render("upload", {
          msg: "File uploaded!",
          file: `uploads/${req.file.path}`,
          img: path.join("public", "saved", `${id}.png`)
        });
      }
    );

    // res.render("upload", {
    //   msg: "File uploaded!",
    //   file: `uploads/${req.file.path}`,
    //   img: path.join("public", "saved", `${id}.png`)
    // });
  });
}

module.exports = uploadHandler;
