import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';
import subCategoryRoutes from "./routes/subcategoryRoutes.js";
import cartRoutes from './routes/cartRoutes.js';
import productReviewRoutes from './routes/productReviewRoutes.js';
import myListRoutes from './routes/myListRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
const __dirname = path.resolve();

connectDB();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

cloudinary.config({
    cloud_name: 'ddpz2khbx',
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/productReview", productReviewRoutes);
app.use("/api/list", myListRoutes);
app.use("/api/order", orderRoutes);

// http://localhost:5000 => backend,frontend

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
