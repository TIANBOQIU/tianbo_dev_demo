const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const app = (module.exports.app = express());
const http = require("http");
const https = require("https");
const httpServer = (module.exports.httpServer = http.createServer(app));

const port = 3000;

const fileUpload = require("./controllers/upload");

/**
 * set up the app
 */

// EJS
app.set("view engine", "ejs");
// public static folder
//app.use(express.static("public"));

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("index"));
app.get("/upload", (req, res) => res.render("upload"));
app.post("/upload", fileUpload);

httpServer.listen(port, () => console.log(`server started on port ${port}`));
