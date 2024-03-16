const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../Models/userModel")
const secretkey = "vaibhav"

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, secretkey); 
            req.user = await User.findById(decoded.userId).select("-password");

            next();
        }catch(error){
            res.status(401);
            throw new Error("not authorized , Invalid token")
        }

    }else {
        res.status(401);
        throw new Error("Not authorized, no token ")
    }
})


module.exports = protect