const jwt = require("jsonwebtoken");
module.exports = async function(req, res, next){
    let token = req.header("Authorization");
    if (!token) return res.status(401).send("Access Denied");
    else token = token.split(" ")[1].trim();
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) return res.status(500).send("Access Denied");
    req.user = decoded;
    next();

}