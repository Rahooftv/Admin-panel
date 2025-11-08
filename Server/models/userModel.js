import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name:{type:String,required:true,index:true},
    email:{type:String,required:true,unique:true,index:true},
    password:{type:String,required:true},
    phone:{type:String,unique:true},
    isAdmin:{type:Boolean,default:false},

})

export default mongoose.model("User",userSchema)