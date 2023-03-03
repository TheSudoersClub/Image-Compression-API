// sharp module to compress the image
const sharp = require('sharp');

// fs module to read the files
const fs = require('fs');

// path for images directory (this directory contains the images that has to be compressed)
const inputDirPath = "server/uploads/images/";

// path for compressed images directory
const outputDirPath = "server/uploads/compressed/";

async function compress(imageName, compressionLevel) {

    // Read the input image file
    const imagePath = inputDirPath + imageName;
    const inputBuffer = fs.readFileSync(imagePath);

    // generate path for the storing the compressed image
    const compressedImagePath = outputDirPath + imageName;

    // get input image metadata to extract width
    await sharp(inputBuffer)
        .metadata()
        .then(metadata => {
            // resize and compress image
            sharp(inputBuffer)
                .resize({
                    width: metadata.width
                })
                .jpeg({
                    quality: compressionLevel
                })
                .toBuffer()
                .then(outputBuffer => {
                    // write output file
                    fs.writeFileSync(compressedImagePath, outputBuffer);
                    console.log(`Image compressed to ${compressionLevel}% of its original size with width of ${metadata.width}px`);
                    return true;

                })
                .catch(err => {
                    console.error(err)
                    return false;
                });
        })
        .catch(err => {
            console.error(err)
            return false
        });
}

// export the compress function
module.exports = compress;