const express = require('express');
const router = express.Router();

// import the upload object from upload.js
const { upload, getFileName } = require("../lib/multer/upload");

// import the upload object from upload.js
const compress = require("../lib/sharp/compress");

// compress image route
router.post('/', upload.single('file'), async (req, res) => {
    // updated unique name of file that has been send by client 
    const fileName = await getFileName();

    // process the image 
    let status = compress(fileName, 10);

    // send the image id from which one can download the image from download endpoint
    if (status) {
        res.send({
            id: fileName
        })
    } else {
        console.log("unable to compress the image");
    }

});

// export the router
module.exports = router;