import Product from "../models/productModel.js"
import Category from "../models/categoryModel.js"

export const getProducts = async(req,res,next)=>{
  try{
    const products = await Product.find().populate("categoryId","name")
    res.json(products)
  }catch(err){
    next(err)
  }
}



export const addProduct =async(req,res,next)=>{
  try{
    const product = await Product.create(req.body)
    res.status(201).json({message:"Product created", product})
  }catch(err){
    next(err)
  }
}


export const updateProduct = async(req,res,next)=>{
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{ new:true })
    if(!updatedProduct){
      return res.status(404).json({message:"product not found"})
    }

    res.json({message:"Product updated",product:updatedProduct})
  }catch(err){
    next(err)
  }
}


export const deleteProduct = async(req,res,next)=>{
  try{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if(!deletedProduct){
        return res.status(404).json({message:"Product not found"})
      
    }
    res.json({ message:"Product deleted"})
  }catch(err){
    next(err)
  }
}


