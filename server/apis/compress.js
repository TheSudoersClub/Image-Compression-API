const express = require('express');
const router = express.Router();

// exec module to run system commands - to remove (delete) the file 
const {
    exec
} = require('child_process');

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

    // get the requested compression size
    const compressionSizeInKB = req.body.compressionSizeInKB;

    // delete the generated image after 10min
    setTimeout(() => {
        exec(`rm -f "server/uploads/images/${fileName}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
        });
    }, 10000);

    // process the image 
    let result = compress(fileName, compressionSizeInKB);

    // handle result
    result.then((status) => {
        // response
        if (status) {
            // send the image id from which one can download the image from download endpoint
            res.status(200).send({
                status: true,
                response: fileName
            })
        } else {
            res.status(500).send({
                status: false,
                response: "Unable to compress the image"
            });

        }
    })

});

// export the router
module.exports = router;