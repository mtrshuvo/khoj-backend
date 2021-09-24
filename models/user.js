const jwt = require("jsonwebtoken");
const {Schema, model} = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
        
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
    
}, {timestamps: true});

userSchema.methods.generateToken = function (){
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
    });
    return token;
}

const validateUser = user => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).email().required(),
        name: Joi.string().required().min(3).max(100),
        password: Joi.string().min(5).max(20).required(),
    });
    return schema.validate(user);
}


module.exports.User = model("User", userSchema);
module.exports.validate = validateUser;