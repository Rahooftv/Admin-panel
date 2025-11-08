import User from "../models/userModel.js"


export const getUser = async (req,res,next)=>{
    try{
        const users =  await User.find()
        res.json(users)
    }catch(err){
        next(err)
    }
}

export const addUser = async(req,res,next)=>{
    try{
        const user = new User(req.body)
        const saveUser =  await user.save()
        res.status(201).json({message:"User Create successfully",user:saveUser})
    }catch(err){
        next(err)
    }
}

export const updateUser = async(req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body)
        if(!updatedUser){
            return res.status(404).json({message:"User not found"})
        }
        res.json({message:"Update user successfully",user:updatedUser})
    }catch(err){
        next(err)
    }
}



export const deleteUser = async (req,res,next)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(404).json({message:"User not found"})
        }
        res.json({message:"user deleted"})
    }catch(err){
        next(err)
    }

}