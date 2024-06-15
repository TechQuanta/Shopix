import express from "express";
import { addCategory, deleteCategory, getCategories, getCategoryById, getCategorys, updateCategory } from '../controllers/CategoryController.js';

const router = express.Router();

router.get("/getcategories", getCategories);
router.get("/getAllCategories", getCategorys);
router.post("/addcategory", addCategory);
router.get("/:id", getCategoryById);
router.get("/delete/:id", deleteCategory);
router.put("/update/:id", updateCategory);

export default router;