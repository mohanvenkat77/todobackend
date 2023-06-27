const dotenv = require('dotenv').config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//TO REGISTER AS USER
const userRegister = async (req, res) => {
    try {
        let { password, email } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ status: "Failed", field: "email", message: "Email already exist!!" })
        let newUser = await new User({
            ...req.body,
            password: hashedPassword,
        });
     
        newUser = await newUser.save();
   
        res.status(201).json({ status: "Success", user: newUser });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}


//TO LOGIN AS USER
const userLogin = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const {email} = user;
                let jwtToken = await jwt.sign({email }, process.env.SECRET);
                res.status(200).json({ status: "Success", token: "JWT " + jwtToken, user : {email}});
            } else {
                res.status(401).json({ status: "Failed", field: "password", message: "Password not match!!" });
            }
        } else {
            res.status(401).json({ status: "Failed", field: "email", message: "User not found!!" });
        }

    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}




module.exports = { userLogin, userRegister};