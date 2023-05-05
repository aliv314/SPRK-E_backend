const router = require("express").Router();
const emotionController = require("../controllers/emotionController");
//api/emotion/
router
    .route("/")
    .get(emotionController.index)
    .post(emotionController.addEmotion);

// router
//     .route("/:id")
//     .get(emotionController.getEmotion);

module.exports = router;