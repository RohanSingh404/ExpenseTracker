const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

//register user
const registerUser = async (req, res) => {
    const { FullName, email, password , profileImageURL } = req.body || {};

    //validate input
    if (!FullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    try {
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //create new user
        const user = await User.create({
            FullName,
            email,
            password,
            profileImageURL
        });

        //generate token
        const token = generateToken(user._id);

        res.status(201).json({ 
            id: user._id,
            user,
            token }
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}

//login user
const loginUser = async (req, res) => {
    const { email, password} = req.body;

    //validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    try {
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser || !(await existingUser.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //generate token
        const token = generateToken(existingUser._id);

        res.status(201).json({ 
            id: existingUser._id,
            existingUser,
            token }
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
//get user profile
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};