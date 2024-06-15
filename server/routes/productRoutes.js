import express from "express";
import { addProduct, deleteProduct, filterProduct, getAllProducts, getAllProductsById, getAllProductsLess, getCatProduct, getCatProductPage, getCatWiseProduct, getCategoryProduct, getCategoryWuseProduct, getFeaturedProduct, getLatestProducts, getProductDetails, getSubCatProductPage, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/getallproducts", getAllProducts);
router.get("/getallproductsbyid/:id", getAllProductsById);
router.get("/getLatestproducts", getLatestProducts);
router.get("/getFeaturedproducts", getFeaturedProduct);
router.get("/filterproduct", filterProduct);
router.get("/getallproductsless", getAllProductsLess);
router.post("/updateproduct", updateProduct);
router.post("/deleteproduct", deleteProduct);
router.get("/getcategorylist", getCategoryWuseProduct);
router.post("/getcategoryproduct/:category", getCategoryProduct);
router.post("/getcatproduct/:category", getCatProduct);
router.post("/getcatproductpage", getCatProductPage);
router.post("/getSubcatproductpage", getSubCatProductPage);
router.post("/getproductdetails", getProductDetails);
router.post("/getcatwiseproducts/:category", getCatWiseProduct);

export default router;
