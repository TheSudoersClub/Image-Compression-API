const express = require('express');
const router = express.Router();

// upload data
const upload = require("../lib/multer/upload");

// compress image route
router.post('/', upload.single('file'), (req, res) => {

    // todo - process the image 

    // send updates image - req.file is the file that was uploaded
    res.send(req.file.path);
});

// export the router
module.exports = router;