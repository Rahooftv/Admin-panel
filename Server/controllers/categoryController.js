import Category from "../models/categoryModel.js"


export const getCategories = async(req,res,next)=>{
  try{
    const category = await Category.find()
    res.json(category)
  }catch(err){
    next(err)
  }
}


export const addCategory = async(req,res,next)=>{
  try{
    const category = await Category.create(req.body)
    res.status(201).json({message: "Category created",category })
  }catch(err){
    next(err)
  }
}


export const updateCategory = async(req,res,next)=>{
  try{
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true})
    if(!updatedCategory){
         return res.status(404).json({message:"Category not found"})

    }
    res.json({message:"Category updated",category: updatedCategory })
  }catch(err){
    next(err)
  }
}




export const deleteCategory = async(req,res,next)=>{
  try{
    const deletedCategory = await Category.findByIdAndDelete(req.params.id)
    if(!deletedCategory){
          return res.status(404).json({message:"Category not found"})
    }
    res.json({message:"Category deleted"})
  }catch(err){
    next(err)
  }
}
