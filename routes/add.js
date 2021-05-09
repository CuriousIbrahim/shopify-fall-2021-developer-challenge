const express = require('express');
const multer = require('multer')
const path = require("path");
const { isNull } = require("../utils");



const storage = multer.diskStorage({
    destination: `${__dirname}/../images/`,
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})
const uploadImage = multer({ storage }).single("file");

const router = express.Router();

router.post("/uploadImage", uploadImage, (req, res, next) => {
    const timestamp = Date.now();

    const { body, file } = req;

    let {
        name,
        tags,
        private
    } = body;

    const {
        filename,
        path
    } = file;

    if (isNull(name)) {
        name = filename;
    }

    if (isNull(tags)) {
        tags = [];
    } else {
        tags = tags.split(",");
    }

    if (isNull(private)) {
        private = false;
    }

    console.log(name, filename, path, tags, private, timestamp);

    return res.sendStatus(200);
});

router.post("/", (req, res) => {
    console.log(req.body);


});

module.exports = router;