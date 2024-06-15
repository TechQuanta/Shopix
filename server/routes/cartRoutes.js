import express from "express";
import { createcartList, deletecartList, getcartList, updatecartList } from "../controllers/cartController.js";


const router = express.Router();

router.get("/getCartList", getcartList);
router.post("/createCartList", createcartList);
router.delete("/deleteCartList", deletecartList);
router.put("/updateCartList/:id", updatecartList);

export default router;