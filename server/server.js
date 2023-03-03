// express module for server
const express = require("express");
const app = express();

// compress route
const compress = require("./apis/compress");

app.use((req, res, next) => {

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// compress endpoint
app.use("/compress", compress);

// server listener
app.listen(3000, () => {
    console.log("Api listening on port 3000");
});