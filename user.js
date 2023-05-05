const router = require("express").Router();
const knex = require('knex')(require('./knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize = require('../middleware/authorize');

// /register
router.post("/register", async (req, res) => {
    const { user_name, password } = req.body;
});