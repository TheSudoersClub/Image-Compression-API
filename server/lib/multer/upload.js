// multer to handle the uploads
const multer = require("multer");

// path module to handle file
const path = require('path');

let fileName = null;

// Set up Multer for file uploads
const storage = multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: function (req, file, cb) {
        // since the api is running from server.js so file path will be uploads instead of ../uploads
        cb(null, 'server/uploads/images');
    },

    // Set the filename for uploaded files
    filename: function (req, file, cb) {
        // generate the unique file name
        fileName = (path.parse(file.originalname).name) + '-' + Date.now() + path.extname(file.originalname)
        cb(null, fileName);

    },
});

// Create a Multer instance with the storage options
const upload = multer({
    storage,
});

// export upload
module.exports = {
    upload,
    getFileName: () => fileName
};