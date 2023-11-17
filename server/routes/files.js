const crypto = require("crypto");
const upload = require("../upload");
const { Router, response } = require("express");
const router = Router();

router.get("/", (req, res) => {
    let responseData = {
        files: [],
        length: 0
    };

    res.status(200).json(responseData);
});

router.post("/", upload.single("file"), (req, res) => {
    const fileData = {
        name: req.body.name,
        content: req.file
    }

    let responseData = {
        message: "File created successfully.",
        file: fileData
    };

    res.status(201).json(responseData);
});

router.delete("/:uuid", (req, res) => {
    const uuid = req.params.uuid;

    let responseData = {
        message: "The file was deleted.",
        uuid: uuid
    };

    res.status(200).json(responseData);
});

module.exports = router;
