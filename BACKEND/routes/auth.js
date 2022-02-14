const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
//bcrypt is used to add salt to password
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'iNotebook@project';

//ROUTE 1:create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    //Taking input with conditions 
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //if there are errors(input is not valid), return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //check wheather the user with this email exist already. (putting in email from req.body)
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User with this email already exist" })
        }
        //adding salt in password and making its hash for securing password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            //storing hashed password in database
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        // creates a token using id of a particular user
        const authtoken = jwt.sign(data, JWT_SECRET);

        // storing this token in database
        success = true
        res.json({ success, authtoken: authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//ROUTE 2:authenticate a user using: POST "/api/auth/login".
router.post('/login', [
    //taking input
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    let success = false
    //if there are errors(if input is not valid), return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //taking input to variables from request body
    const { email, password } = req.body;
    try {
        //weather the user exist 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please enter correct details" });
        }

        //using bcrypt for comparing entered password with hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please enter correct details" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        //token using id of user
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});


//ROUTE 3: Get loggedin User details using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        //fetching id from fetchuser
        userId = req.user.id;
        //getting all details of user except password(hashed password)
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;