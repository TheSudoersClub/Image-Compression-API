const express = require('express');
const router = express.Router();

// exec module to run system commands - to remove (delete) the file 
const {
    exec
} = require('child_process');

// import the upload object from upload.js
const { upload, getFileName } = require("../lib/multer/upload");

// import the upload object from upload.js
const compress = require("../lib/sharp/compress");

// compress image route
router.post('/', upload.single('file'), async (req, res) => {

    // updated unique name of file that has been send by client 
    const fileName = await getFileName();

    // delete the generated directory after 10min
    setTimeout(() => {
        exec(`rm -f server/uploads/images/${fileName}`, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
        });
    }, 600000);

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