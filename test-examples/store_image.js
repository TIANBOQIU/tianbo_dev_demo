const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const config = require("../config");
const express = require("express");
/**
 * upload an image to aws s3 bucket
 * @param {String} filename
 * @return a promise
 */

function uploadToS3(filename) {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: config.user.accessKeyID,
      secretAccessKey: config.user.secretAccessKey,
      region: "us-east-2"
    });
    const s3 = new aws.S3();
    const localImage = path.join(__dirname, "..", "public", "saved", filename);
    const BUCKET = "tinbo.dev.images";
    const remoteName = filename;
    const params = {
      Bucket: BUCKET,
      Body: fs.readFileSync(localImage),
      Key: remoteName
    };
    return s3.putObject(params).promise();
  } catch (err) {
    console.log("s3 error", err);
  }
}

function getS3Image(req, res) {
  const filename = req.params.filename;
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: config.user.accessKeyID,
      secretAccessKey: config.user.secretAccessKey,
      region: "us-east-2"
    });
    const s3 = new aws.S3();
    let fileStream = fs.createWriteStream(
      path.join(__dirname, "..", "public", "S3", filename)
    );
    const params = {
      Bucket: "tinbo.dev.images",
      Key: filename
    };
    let s3Stream = s3.getObject(params).createReadStream();
    s3Stream.on("error", err => console.log("s3 read err", err));
    s3Stream
      .pipe(fileStream)
      .on("error", err => console.log("write error ", err))
      .on("close", () => {
        //res.send("retrieved!");
        res.render("show_image", {
          img: path.join("..", "public", "S3", filename)
        });
      });
  } catch (err) {
    console.log("s3 error ", err);
  }
}

module.exports.uploadToS3 = uploadToS3;
module.exports.getS3Image = getS3Image;
