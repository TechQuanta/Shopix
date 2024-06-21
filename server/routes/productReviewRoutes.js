import express from "express";
import { createReview, deleteReview, getReviews, getReviewsById, getReviewsByProduct, updateReview } from "../controllers/productReviewController.js";

const router = express.Router();

router.get("/getReviews", getReviews);
router.post("/createReview", createReview);
router.delete("/deleteReview", deleteReview);
router.put("/updateReview/:id", updateReview);
router.get("/getReviewsById", getReviewsById);
router.get("/getReviewsByProduct", getReviewsByProduct);

export default router;