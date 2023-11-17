const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    // TODO: Render React app
    
    let responseData = {
        message: "You accessed the website index."
    };

    res.status(200).json(responseData);
});

module.exports = router;
