const User = require("../models/loginData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateUser = {
    signUp: async(req,res) => {
        const {name,email,phone,password} = req.body;
        try{
            const existingUser = await User.findByEmail(email);
            if(existingUser){
                return res.status(400).json("User already exists");
            }
            const hp = await bcrypt.hash(password,10);

            await User.create({name,email,phone,password:hp});
            res.status(201).json("success");
        }catch(err){
            console.log(err);
            res.status(500).json("Error creating user");

        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(400).json("email not found");
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json("password incorrect");
            }
            const token = jwt.sign({ userId: user.id }, "secret"); // Ensure user.id is correct
            res.status(200).json({ token, message: "success" }); // Return token in JSON
        } catch (err) {
            console.log(err);
            res.status(500).json("Error logging in");
        }
    }
};
module.exports = authenticateUser;