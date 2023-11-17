const crypto = require("crypto");
const upload = require("../upload");
const db = require("../dev-db");
const path = require("path");
const { Router, response } = require("express");
const router = Router();


router.get("/", (req, res) => {
    const files = db.queryAll();
    let responseData = {
        files,
        length: files.length
    };

    res.status(200).json(responseData);
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    const file = db.queryById(id);
    const exists = typeof file !== "undefined";
    
    let responseData = {
        file
    }

    if (!exists) responseData.message = "The file does not exist";

    res.status(exists ? 200 : 404).json(responseData);
});

router.get("/:id/content", (req, res, next) => {
    const id = req.params.id;
    const file = db.queryById(id);
    
    if (typeof file === "undefined") {
        let responseData = {
            message: "The file does not exist",
            id
        }
        res.status(404).json(responseData);
        return;
    }
    
    const options = {
        root: path.join(__dirname, '..', 'files')
    };

    res.status(200).sendFile(file.filename, options, (err) => {
        if (err) next(err);
    });
});

router.post("/", upload.single("file"), (req, res) => {
    const { filename, originalname, size } = req.file;

    const fileData = {
        id: filename,
        name: originalname,
        size
    }

    db.insert(filename, originalname, filename, size);

    let responseData = {
        message: "File created successfully.",
        file: fileData
    };

    res.status(201).json(responseData);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    const result = db.remove(id)

    let responseData = {
        message: result ? "The file was deleted." : "The file does not exist",
        id: id
    };

    res.status(result ? 200 : 404).json(responseData);
});

module.exports = router;
