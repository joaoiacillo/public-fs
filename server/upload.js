const multer = require("multer");
const upload = multer({
    dest: "files/",
    limits: {
        fileSize: 33_554_432 // 32MB
    }
});

module.exports = upload;
