import jwt from "jsonwebtoken"
import User from "../models/user.js";

//middleware

export const protect=async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
        try{
            let decoded=jwt.verify(
                token,
                process.env.JWT_SECRET,
            )
            req.user= await User.findById(decoded.id);
            next();
        }catch(error){
            res.status(401).json({
                message: "Not Authorized",
            })
        }
    }else{
        res.status(401).json({
            message: "No token",
        })
    }
}