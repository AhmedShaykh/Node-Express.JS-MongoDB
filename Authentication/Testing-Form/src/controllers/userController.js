const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        // ========== Existing User Check ========== //

        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // ========== Hashed Password ========== //

        const hashedPassword = await bcrypt.hash(password, 10);

        // ========== Create User ========== //

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        // ========== Create Token ========== //

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Somethin Went Worng!" });
    }

};

const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        // ========== Existing User Check ========== //

        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // ========== Check Hashed Password ========== //

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // ========== Token Check ========== //

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(201).json({ user: existingUser, token: token });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Somethin Went Worng!" });
    }

};

module.exports = { signup, signin };