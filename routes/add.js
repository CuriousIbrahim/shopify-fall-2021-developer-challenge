const express = require('express');
const multer = require('multer');
const vision = require("@google-cloud/vision");
const path = require("path");
const { isNull } = require("../utils");
const Database = require("../db");

const client = new vision.ImageAnnotatorClient();

const database = new Database();

const storage = multer.diskStorage({
    destination: `${__dirname}/../images/`,
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})
const uploadImage = multer({ storage }).single("file");

const router = express.Router();

router.post("/", uploadImage, async (req, res, next) => {
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

    const [result] = await client.labelDetection(path);

    const labels = result.labelAnnotations;

    const labelsToAdd = labels.map(label => label.description);

    tags = tags.concat(labelsToAdd);

    database.addImage(name, filename, path, tags, private, timestamp);

    return res.sendStatus(200);
});


module.exports = router;