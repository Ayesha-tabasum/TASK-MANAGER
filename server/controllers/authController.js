import User from "../models/user.js"
import  bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


//register user

export const registerUser=async(req,res)=>{

    try{
         const{name,email,password}=req.body;

          if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingUser=await User.findOne({email});

    if(existingUser){
         return res.status(400).json({
            message:"user already exists",
        })
    }

    const salt=await bcryptjs.genSalt(10);
    const hashPassword=await bcryptjs.hash(password,salt);

    const user=await User.create({
        name,
        email,
        password: hashPassword,
        role : "user",
    });

    res.status(201).json({
        message: "user registered",
    });
    }catch(error){
    res.status(500).json(error.message);
}
    
}



//login function
export const loginUser=async (req,res) => {
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
             return res.status(404).json({
                message: "user not found",
            });
        }
         const isMatch=await bcryptjs.compare(
            password,
            user.password
         )

         if(!isMatch){
            return  res.status(400).json({
                message: "Invalid credentials",
            });
        }
          const token=jwt.sign({
             id: user._id,
             role: user.role,
          }, process.env.JWT_SECRET,
          {           expiresIn: "7d",
          }) 

          const decoded=jwt.verify(token,process.env.JWT_SECRET)
         res.status(200).json({
            message:"user login successfully",
           token,
           user,
         })
    }catch(error){
         res.status(500).json(error.message)
    }


};


