/*
GET/POST/ - api/user/:id
GET/POST - /api/entry
GET/PUT/DEL - api/entry:id
GET/POST/ - api/emotion
GET - api/emotion:id
*/

const router = require("express").Router();
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize = require('../middleware/authorize');

// ## POST /api/user/register
// - Creates a new user.
// - Expected body: { username, last_name, phone, address, email, password }
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    //if username already exists
    try{
       const username =  await knex('user').where({username:username});
       if (username){
            return res.status(400).send("Username already exists");
       }
    }catch(error){
        console.log(error);
        res.status(400).send("Failed to verify username.");
    }

    if (!username || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

    const hashedPassword = bcrypt.hashSync(password);

    // Create the new user
    const newUser = {
        username,
        password: hashedPassword
    };

    // Insert it into our database
    try {
        await knex('user').insert(newUser);
        res.status(201).send("Registered successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed registration");
    }
});

// ## POST /api/user/login
// -   Generates and responds a JWT for the user to use for future authorization.
// -   Expected body: { email, password }
// -   Response format: { token: "JWT_TOKEN_HERE" }
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!user || !password) {
        return res.status(400).send("Please enter the required fields");
    }

    // Find the user
    const user = await knex('user').where({ username: username }).first();
    if (!user) {
        return res.status(400).send("Invalid email");
    }

    // Validate the password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send("Invalid password");
    }

    // Generate a token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );

    res.json({ token })
});


// ## GET /api/user/current
// -   Gets information about the currently logged in user.
// -   If no valid JWT is provided, this route will respond with 401 Unauthorized.
// -   Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
router.get("/current", async (req, res) => {
    // If there is no auth header provided
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }

    // Parse the bearer token
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(' ')[1];

    // Verify the token
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);
        console.log(decoded);
        // Respond with the appropriate user data
        const user = await knex('user').where({ id: decoded.id }).first();
        console.log(user);
        delete user.password;
        res.json(user);
    } catch (error) {
        return res.status(401).send("Invalid auth token");
    }
});

//Demonstrate using auth on a single route
router.get("/", authorize, async (req, res)=> {
    try {
		const user = await knex
		.select("*")
		.from("user")

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Unable to retrieve user data" });
	}
})



module.exports = router;
