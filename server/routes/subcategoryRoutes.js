import express from "express";
import { addCategory, deleteSubcat, getCategories, getCategoriesPage, getCategoriesby, getCategoriesbyName, updateSubcat } from "../controllers/SubcategoryController.js";


const router = express.Router();

router.get("/getsubcategories", getCategories);
router.get("/getsubcategoriespage/:category", getCategoriesPage);
router.post("/addSubCategories/:category", addCategory);
router.post("/getsubcategoriesby/:category", getCategoriesby);
router.delete("/deletesubcategory/:id", deleteSubcat);
router.post("/getsubcategoriesbyname/:category", getCategoriesbyName);
router.put("/updatesubcategory/:id", updateSubcat);

export default router;