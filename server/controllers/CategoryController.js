import CategorySchema from "../models/categorySchema.js";
import { v2 as cloudinary } from "cloudinary";

export const getCategories = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const totalPosts = await CategorySchema.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ message: "Page not found" })
        }

        const categories = await CategorySchema.find().skip((page - 1) * perPage).limit(perPage).exec();

        res.json({
            message: "Categories fetched successfully.",
            data: categories,
            totalPages: totalPages,
            totalPosts: totalPosts,
            page: page,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const getCategorys = async (req, res) => {
    try {

        const categories = await CategorySchema.find();

        res.json({
            message: "Categories fetched successfully.",
            data: categories,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const addCategory = async (req, res) => {
    const { name, color } = req.body;
    let { image } = req.body;
    try {
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            image = uploadedResponse.secure_url;
        }

        const newCategory = new CategorySchema({
            name: name,
            image: image,
            color: color,
        });

        await newCategory.save();

        res.json({
            message: "Categories added successfully.",
            data: newCategory,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {

        if (!id) return res.status(400).json({ error: "ID not found" });

        const category = await CategorySchema.findById(id);

        res.json({
            message: "Category fetched successfully.",
            data: category,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {

        const category = await CategorySchema.findById(id);

        if (!category) return res.status(400).json({ error: "ID not found" });

        if (category.image) {
            const imgId = category.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await CategorySchema.deleteOne({ _id: id });

        res.json({
            message: "Category deleted successfully.",
            data: category,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const updateCategory = async (req, res) => {
    const { name, color } = req.body;
    let { image } = req.body;
    const { id } = req.params;
    try {

        if (!id) return res.status(400).json({ error: "ID not found" });

        let category = await CategorySchema.findById(id);

        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            image = uploadedResponse.secure_url;
        }

        category.name = name || category.name;
        category.image = image || category.image;
        category.color = color || category.color;

        category = await category.save();

        res.json({
            message: "Category updated successfully.",
            data: category,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};