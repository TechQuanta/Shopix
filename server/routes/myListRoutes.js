import express from "express";
import { createOneList, deleteMyList, getMyList, getMyListById, getMyListByUser, updateMyList } from "../controllers/myListController.js";

const router = express.Router();

router.get("/getMyList", getMyList);
router.post("/createOneList", createOneList);
router.delete("/deleteMyList", deleteMyList);
router.put("/updateMyList/:id", updateMyList);
router.get("/getMyListById", getMyListById);
router.get("/getMyListByUser", getMyListByUser);

export default router;