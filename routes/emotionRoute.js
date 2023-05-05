const router = require("express").Router();
const emotionController = require("../controllers/emotionController");

router
    .route("/")
    .get(emotionController.getEmotion)
    .post(emotionController.addEmotion);

router
    .route("/:id")
    .get(emotionController.getEmotion);

module.exports = router;