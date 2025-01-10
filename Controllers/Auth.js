import { validationResult } from "express-validator";
import  User  from "./../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ message: "User registered successfully" });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }   
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}