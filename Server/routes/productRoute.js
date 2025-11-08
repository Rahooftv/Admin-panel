import express from "express"
import { getProducts,addProduct,updateProduct,deleteProduct } from "../controllers/productController.js"
import {auth} from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/admin.js"

const router = express.Router()

router.get("/",auth,getProducts)
router.post("/",auth,isAdmin,addProduct)
router.put("/:id",auth,isAdmin,updateProduct)
router.delete("/:id",auth,isAdmin,deleteProduct)

export default router