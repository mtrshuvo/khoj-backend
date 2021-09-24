const jwt = require("jsonwebtoken");
const {Schema, model} = require("mongoose");

const dataSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    payload: [{}],

}, {timestamps: true});

module.exports.Data = model("Data", dataSchema);