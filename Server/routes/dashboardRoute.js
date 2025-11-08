import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import {auth} from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/admin.js";
const router = express.Router()

router.get("/",auth,isAdmin,getDashboard)

export default router