import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async(req,res,next) =>{
  try{
    const {name,email,phone,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new User({email,name,password: hashedPassword,phone})

    await newUser.save()
    res.status(201).json({message:"User registered successfully"})
  }catch(err){
    next(err)
  }
}


export const login = async (req,res,next) =>{
  try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user) return res.status(400).json({message:"User not found"})

    const match = await bcrypt.compare(password,user.password)
    if (!match) return res.status(400).json({message:"Invalid password"})

    const token = jwt.sign({ userId: user._id,isAdmin: user.isAdmin },process.env.JWT_SECRET,{expiresIn:"1h"})

        
    res.cookie("token", token, {
      httpOnly: true,  
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 
    })
   
   res.status(200).json({message:"User login successfully", token,
      user: { _id: user._id, email: user.email, isAdmin: user.isAdmin, name: user.name, },
    })
  }catch(err){
   next(err)
  }
}

export const authMe =  async (req,res) =>{
  try{
    const user = await User.findById(req.user.userId).select("-password")
    res.json({user})
  }catch(err){
   next(err)
  }
}

export const logout =(req,res) =>{
  res.clearCookie("token")
  res.json({ message: "Logged out successfully"})
}
