require("dotenv").config();
const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const app = (module.exports.app = express());
const http = require("http");
const https = require("https");
const httpServer = (module.exports.httpServer = http.createServer(app));
const bodyParser = require("body-parser");
//const io = require("socket.io")(httpServer);
const HOSTNAME = "tianbo.dev";
const httpPort = 80;
const httpsPort = 443;

const httpsOptions = {
  cert: fs.readFileSync("./ssl/tianbo_dev.crt"),
  ca: fs.readFileSync("./ssl/tianbo_dev.ca-bundle"),
  key: fs.readFileSync("./ssl/tianbo_dev.key")
};

const httpsServer = https.createServer(httpsOptions, app);

if (process.env.NODE_ENV == "REMOTE") {
  app.use((req, res, next) => {
    if (req.protocol === "http") {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

const fileUpload = require("./controllers/upload");
const { getS3Image } = require("./controllers/store_image");
/**
 * set up the app
 */

// EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("index"));
app.get("/upload", (req, res) => res.render("upload"));
app.post("/upload", fileUpload);
app.get("/sourcecode/:filename", getS3Image);

//httpServer.listen(port, () => console.log(`server started on port ${port}`));

if (process.env.NODE_ENV == "REMOTE") {
  httpServer.listen(httpPort, "0.0.0.0", HOSTNAME);
  httpsServer.listen(httpsPort, "0.0.0.0", HOSTNAME, () =>
    console.log("listening on port" + httpsPort)
  );
} else if (process.env.NODE_ENV == "TEST") {
  let test_port = 3000;
  httpServer.listen(test_port, () =>
    console.log(`server started on port ${test_port}`)
  );
}
