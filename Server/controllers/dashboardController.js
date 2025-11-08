import User from "../models/userModel.js"
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"


export const getDashboard = async(req,res,next)=>{
    try{
        const totalUsers = await User.countDocuments()
        const totalProducts = await Product.countDocuments()
        const totalRevenues = await Order.aggregate([
            {$group:{_id:null,totalRevenue:{$sum:"$totalAmount"}}}
        ])

        const totalRevenue = totalRevenues[0]?.totalRevenue||0
       

        const totalOrder = await Order.aggregate([
            {$unwind:"$items"},
            {$lookup:{from:"products",localField:"items.productId",foreignField:"_id",as:"product"}},
            {$unwind:"$product"},
            {$group:{_id:"$product.categoryId",totalOrders:{$sum:"$items.quantity" }}},
            {$lookup:{from:"categories",localField:"_id",foreignField:'_id',as:"category"}},
            {$unwind:"$category"},
            {$project:{_id:0,category:"$category.name",totalOrders:1}}
        ])

        
        res.json({totalUsers,totalProducts,totalRevenue,totalOrder})

        
    }catch(err){
        next(err)
    }

}