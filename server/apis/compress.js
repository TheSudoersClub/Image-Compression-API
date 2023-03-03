const express = require('express');
const router = express.Router();

// import the upload object from upload.js
const { upload, getFileName } = require("../lib/multer/upload");

// compress image route
router.post('/', upload.single('file'), (req, res) => {

    // todo - process the image 

    // updated unique name of file that has been send by client 
    const fileName = getFileName();

    // send the image id from which one can download the image from download endpoint
    console.log(fileName);
    res.send({
        id: fileName
    })
});

// export the router
module.exports = router;