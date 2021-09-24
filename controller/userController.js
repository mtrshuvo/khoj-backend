const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {User, validate} = require("../models/user");
//registration user
module.exports.signUp = async (req, res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    try{
    let user = {};
    user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send("User already registered");
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
        const result = await user.save();
        res.status(201).send({
            message: "Registration Succesful",
            user: _.pick(result, ["_id", "name", "email"])
        });
    }catch (err){
        res.status(500).send("Something Failed !!!");
    }
}

//signin user
module.exports.signIn = async (req, res) =>{
    try{
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Invalid Email or Password");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid Email or Password");

    const token = user.generateToken();
    return res.status(201).send({
        message: "Login Succesful",
        token,
        user: _.pick(user, ["_id", "name", "email"])
    });
}catch (err){
    res.status(500).send("Something Failed !!!");
}
} 


