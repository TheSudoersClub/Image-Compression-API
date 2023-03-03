// sharp module to compress the image
const sharp = require('sharp');

// fs module to read the files
const fs = require('fs');

// Define the compress function
async function compress(imageName, originalImagePath, outputDirPath, targetSizeKB) {
    // Create a path for the compressed image
    const compressedImagePath = outputDirPath + imageName;

    // Read the input file
    let inputBuffer;
    try {
        inputBuffer = fs.readFileSync(originalImagePath);
    } catch (error) {
        // If an error occurs while reading the metadata, return an error message
        return {
            status: false,
            message: 'Failed to read the input file',
            id: null
        };
    }

    // Try to read image metadata to determine if the file is an image
    let metadata;
    try {
        metadata = await sharp(inputBuffer).metadata();
    } catch (error) {

        // delete the unwanted file 
        if (fs.existsSync(originalImagePath)) {
            fs.unlinkSync(originalImagePath);
        }

        // If an error occurs while reading the metadata, return an error message
        return {
            status: false,
            message: 'Input file is not an image',
            id: null
        };
    }

    // Set the initial compression level to 100
    let compressionLevel = 100;
    let outputBuffer, size;

    // Keep trying to compress the image until it reaches the target size
    while (true) {
        // Use Sharp to resize and compress the image
        const result = await sharp(inputBuffer)
            .resize({
                width: metadata.width,
                height: metadata.height
            })
            .jpeg({
                quality: compressionLevel
            })
            .toBuffer({
                resolveWithObject: true
            });

        // Store the compressed image buffer and its size
        outputBuffer = result.data;
        size = outputBuffer.length;

        // If the compressed image is smaller than the target size, break out of the loop
        if (size <= targetSizeKB * 1024) {
            break;
        }

        // Reduce the compression level and try again
        compressionLevel -= 5;
        if (compressionLevel <= 0) {
            // If the compression level reaches 0, the image cannot be compressed to the target size
            return {
                status: false,
                message: 'Cannot compress the image to the target size',
                id: imageName
            };
        }
    }

    // Write the compressed image buffer to a file
    fs.writeFileSync(compressedImagePath, outputBuffer);

    // If the original file still exists, delete it
    if (fs.existsSync(originalImagePath)) {
        fs.unlinkSync(originalImagePath);
    }

    // Schedule the compressed image to be deleted in 10 minutes
    setTimeout(() => {
        if (fs.existsSync(compressedImagePath)) {
            fs.unlinkSync(compressedImagePath);
        }
    }, 600000);

    // Return a success message with the compressed image ID
    return {
        status: true,
        message: 'Image compressed',
        id: imageName
    };
}

// Export the compress function for use in other modules
module.exports = compress;