import express from "express"

import { getCategories,addCategory,updateCategory,deleteCategory } from "../controllers/categoryController.js"
import {auth} from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/admin.js"

const router = express.Router()

router.get("/",auth,getCategories)      
router.post("/",auth,isAdmin,addCategory)           
router.put("/:id",auth,isAdmin,updateCategory)      
router.delete("/:id",auth,isAdmin,deleteCategory)

export default router