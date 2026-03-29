const jwt = require('jsonwebtoken');

//generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

//register user
const registerUser = async (req, res) => {}

//login user
const loginUser = async (req, res) => {}

//get user profile
const getUserProfile = async (req, res) => {}