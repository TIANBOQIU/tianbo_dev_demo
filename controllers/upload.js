/**
 * controller to handle file upload
 */
const { httpServer } = require("../app");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");
const gulp = require("gulp");
const exec = require("child_process").exec;
const io = require("socket.io")(httpServer);
const config = require("../config");
const urljoin = require("url-join");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");

// controllers
const { uploadToS3 } = require("../controllers/store_image");

// io.on("connection", socket => console.log("a user connected"));

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
  limits: { fileSize: 3000000 } // in byte 3M
}).single("myFile"); // the front end input

function uploadHandler(req, res) {
  //   io.on("connection", function(socket) {
  //     let msg = "loading";
  //     io.emit("loading", msg);
  //   });

  upload(req, res, err => {
    if (err || typeof req.file === "undefined") {
      return res.render("upload", { msg: err });
    }
    console.log("the request body", req.body.style);
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
    const filename = id + ".png";
    exec(
      "node " +
        cli_path +
        " " +
        source +
        " -l " +
        save_dir +
        " -t " +
        id +
        " --config public/preset.json",
      (err, stdout, stderr) => {
        if (err) {
          return console.log(err);
        }
        console.log("finish!");

        uploadToS3(filename)
          .then(res => {
            console.log(filename, " saved on s3", res);
          })
          .catch(err => {
            console.log("failed saving on s3 ", err);
          });
        let hostname =
          process.env.NODE_ENV == "REMOTE"
            ? process.env.remoteHost
            : process.env.localHost;
        let url = "http://" + hostname + "/sourcecode/" + filename;
        let full_img_path = path.join("public", "saved", `${id}.png`);
        let compressed_img_path = path.join("public", "compressed");

        res.render("upload", {
          msg: "File uploaded!",
          file: url,
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
