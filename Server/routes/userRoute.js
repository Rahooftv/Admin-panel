import express from "express"
import { getUser,updateUser,addUser,deleteUser } from "../controllers/userController.js";
import {auth} from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router()

router.get("/",auth,isAdmin,getUser)
router.post("/",auth,addUser)
router.put("/:id",auth,isAdmin,updateUser)
router.delete("/:id",auth,isAdmin,deleteUser)

export default router

