// express module for server
const express = require("express");
const app = express();

// compress route
const compress = require("./apis/compress");

// download route
const download = require("./apis/download");

app.use((req, res, next) => {

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// compress endpoint
app.use('/compress', compress);

// compress endpoint
app.use('/download', download);

// server listener
app.listen(3000, () => {
    console.log("Api listening on port 3000");
});