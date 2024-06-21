import express from "express";
import { createOneOrder, createOneOrderCash, deleteOrder, getOrderById, getOrders, getOrdersByUser, getOrdersLatest, updateOrder } from "../controllers/ordersController.js";

const router = express.Router();

router.get("/getOrders", getOrders);
router.get("/getOrdersLatest", getOrdersLatest);
router.post("/createOneOrder", createOneOrder);
router.post("/createOneOrderCash", createOneOrderCash);
router.delete("/deleteOrder", deleteOrder);
router.put("/updateMyList/:id", updateOrder);
router.get("/getOrderById", getOrderById);
router.get("/getOrdersByUser", getOrdersByUser);

export default router;