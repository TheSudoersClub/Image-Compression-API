const express = require("express");
const router = express.Router();

const fs = require("fs");

// route for download the compressed file
router.get("/:filename", (req, res) => {
    // get the path for requested file
    const filepath = `server/uploads/compressed/${req.params.filename}`;

    // sent the requested file to client 
    res.download(filepath, (err) => {

        // if the file is not valid
        if (err) {
            res.status(404).send({
                status: false,
                response: "Unable to locate the file"
            });
        }
    });

});

// export the router 
module.exports = router;