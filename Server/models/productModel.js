import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{type:String,required:true,index:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true},
    price:{type:Number,required:true},
    status:{type:"String",enum:["active","inactive"],default:"active"}
},{timestamps:true})

productSchema.index({ categoryId:1, price:1 })

export default mongoose.model("Product",productSchema)