import express from "express"
import { register,login,logout,authMe } from "../controllers/authController.js"
import { auth } from "../middlewares/auth.js"



const router = express.Router()

router.post("/register",register)
router.post("/login" , login)
router.get("/me", auth, authMe)
router.post("/logout",logout)


export default router
