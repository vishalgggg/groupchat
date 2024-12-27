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
    }
};
module.exports = authenticateUser;