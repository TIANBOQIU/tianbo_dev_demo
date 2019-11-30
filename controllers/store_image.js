const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const config = require("../config");

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

module.exports.uploadToS3 = uploadToS3;
