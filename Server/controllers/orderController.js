import Order from "../models/orderModel.js"

export const createOrder = async (req,res,next) => {
  try {
    const {userId,items} = req.body

    
    const totalAmount = items.reduce((sum,item) =>sum + item.price * item.quantity,0)

    const order = await Order.create({userId,items,totalAmount})

    res.status(201).json({ message: "Order created",order})
  } catch (err) {
    next(err)
  }
}
