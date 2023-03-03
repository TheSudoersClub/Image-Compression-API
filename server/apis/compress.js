const express = require('express');
const router = express.Router();

// fs module to delete the file
const fs = require("fs");

// import the upload object from upload.js
const {
    upload,
    getFileName
} = require("../lib/multer/upload");

// import the upload object from upload.js
const compress = require("../lib/sharp/compress");

// compress image route
router.post('/', upload.single('file'), async (req, res) => {

    // updated unique name of file that has been send by client 
    const fileName = await getFileName();

    // delete the generated image after 10min
    setTimeout(() => {
        if (fs.existsSync(`server/uploads/images/${fileName}`)) {
            fs.unlinkSync(`server/uploads/images/${fileName}`);
        }
    }, 30000);

    // image data
    // get the requested compression size
    const compressionSizeInKB = req.body.compressionSizeInKB;

    // path for images directory (this directory contains the images that has to be compressed)
    const inputDirPath = "server/uploads/images/";

    // path for compressed images directory
    const outputDirPath = "server/uploads/compressed/";

    // get the file path of the file
    const filepath = `${inputDirPath}${fileName}`;


    // process the image and get it's response
    let {
        status,
        message,
        id
    } = await compress(fileName, filepath, outputDirPath, compressionSizeInKB);

    // send the generate response
    res.send({
        status: status,
        message: message,
        id: id
    });
});

// export the router
module.exports = router;