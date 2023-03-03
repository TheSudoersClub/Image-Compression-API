// multer to handle the uploads
const multer = require("multer");

// Set up Multer for file uploads
const storage = multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: function (req, file, cb) {
        // since the api is running from server.js so file path will be uploads instead of ../uploads
        cb(null, 'uploads');
    },

    // Set the filename for uploaded files
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now);
    },
});

// Create a Multer instance with the storage options
const upload = multer({
    storage,
});

module.exports = upload