const express = require('express');
const Database = require("../db");

const database = new Database();

const router = express.Router();

router.get("/", async (req, res, next) => {
    const { q } = req.query;

    const results = await database.searchImage(q);

    return res.send(results);
});

module.exports = router;