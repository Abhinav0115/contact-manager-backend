const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@desc  register users
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
        res.status(400);
        throw new Error("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("user created ", user);

    if (user) {
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("invalid user data");
    }
});

//@desc  login users
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "10m",
            }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or Password are not valid.");
    }
});

//@desc  current users information
//@route GET /api/users/current
//@access Private
const currentrUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentrUser };
