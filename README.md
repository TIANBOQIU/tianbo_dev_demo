### README
_tianbo.dev/upload_

> usage
1. upload your source code file and the language will be auto detected
2. choose theme, font, and font-size or use the default value
3. click the submit, and the rendered source code picture and the sharable URL will be generated (it might take 5 seconds)

> details

**Front end**

The front end is built from HTML, CSS, and JS. Materializecss and Bootstrap are also used for the layout and styles of some pages.

The application page has two main parts. The left is a form with validation on the front end. It will check and validate the uploaded file. If the type of file is not supported or exceed the size limit and also check if the font-size if a valid number. The right part will shows the generated image and also the URL.

**Backend**

The backend uses Node.js, Express.js for the server and uses EJS for the view engine.

The data (the images) are stored in AWS S3. When a new image is created, it will be sent to the front end and also uploaded to a bucket on S3. When the sharable URL is clicked, the target image will be pulled from that bucket.

The main business logic is to generate a rendered image from the source code. This part depends on [Carbon.sh](https://carbon.now.sh/) but it doesn't provide any APIs. So I modified the source code of one of it's client version which can be found in the /carbon-now-cli directory. Puppeteer library and a headless Chrome are also used to support the application. It takes me some time to deploy it on AWS EC2 and fix the needed dependencies under EC2's Linux environment.

**Deployment**

.env file is used to configure the environment (TEST or REMOTE) and also contains access keys for AWS services. The application is hosted on a AWS EC2 instance.

[https://tianbo.dev/upload](https://tianbo.dev/upload)


