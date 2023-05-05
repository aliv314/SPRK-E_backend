/*
GET/POST/ - api/user/:id
GET/POST - /api/entry
GET/PUT/DEL - api/entry:id
GET/POST/ - api/emotion
GET - api/emotion:id
*/

const router = require("express").Router();
const userController = require("../controllers/userController");

router
    .route("/:id")
    .get(userController.getUser)
    .post(userController.addUser);

module.exports = router;