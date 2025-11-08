import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";


import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoute.js"
import orderRoutes from './routes/orderRoute.js'
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"
import dashboardRoutes from "./routes/dashboardRoute.js"

import { errorHandler } from "./middlewares/errorHandle.js"


dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}))

app.use('/api/auth',authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/products",productRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/dashboard",dashboardRoutes)

app.use(errorHandler)

const PORT = process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
        
    })
})

