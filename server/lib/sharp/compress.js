// sharp module to compress the image
const sharp = require('sharp');

// fs module to read the files
const fs = require('fs');

// exec module to run system commands - to remove (delete) the file 
const {
    exec
} = require('child_process');

// path for images directory (this directory contains the images that has to be compressed)
const inputDirPath = "server/uploads/images/";

// path for compressed images directory
const outputDirPath = "server/uploads/compressed/";

async function compress(imageName, targetSizeKB) {
    const originalImagePath = inputDirPath + imageName;
    const compressedImagePath = outputDirPath + imageName;

    const inputBuffer = fs.readFileSync(originalImagePath);

    let compressionLevel = 50; // initial compression quality
    let outputBuffer, metadata, size;

    while (true) {
        // Resize and compress the image with the current compression level
        const result = await sharp(inputBuffer)
            .resize({
                width: 1000 // Set the width to a reasonable value for the original image
            })
            .jpeg({
                quality: compressionLevel
            })
            .toBuffer({
                resolveWithObject: true
            });

        outputBuffer = result.data;
        metadata = result.info;
        size = outputBuffer.length;

        // Check if the compressed image size is smaller than the target size
        if (size <= targetSizeKB * 1024) {
            break;
        }

        // Increase the compression quality and try again
        compressionLevel -= 5;
        if (compressionLevel <= 0) {
            console.error('Cannot compress the image to the target size');
            return false;
        }
    }

    // Write the compressed image to file
    fs.writeFileSync(compressedImagePath, outputBuffer);

    // Remove the original image
    fs.unlinkSync(originalImagePath);

    return true;
}


// export the compress function
module.exports = compress;