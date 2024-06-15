import subCategorySchema from "../models/subCategorySchema.js";
import CategorySchema from './../models/categorySchema.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await subCategorySchema.find();

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

export const getCategoriesPage = async (req, res) => {
    try {
        const { category } = req.params;

        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const totalPosts = await subCategorySchema.countDocuments({ category: category });
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ message: "Page not found" })
        }

        const categories = await subCategorySchema.find({ category: category }).skip((page - 1) * perPage).limit(perPage).exec();

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

export const addCategory = async (req, res) => {
    const { name } = req.body;
    const { category } = req.params;
    try {

        const newSubCategory = new subCategorySchema({
            name: name,
            category: category,
        });

        await newSubCategory.save();

        res.json({
            message: "Categories added successfully.",
            data: newSubCategory,
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

export const getCategoriesby = async (req, res) => {
    try {
        const { category } = req.params;

        const categories = await subCategorySchema.find({ category: category });

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

export const getCategoriesbyName = async (req, res) => {
    try {
        const { category } = req.params;

        const word = category;

        const firstLetter = category.charAt(0);

        const firstLetterCap = firstLetter.toUpperCase();

        const remainingLetters = word.slice(1);

        const capitalizedWord = firstLetterCap + remainingLetters;

        const categories = await CategorySchema.find({ name: capitalizedWord });

        const categoriess = await subCategorySchema.find({ category: categories._id });

        if (categoriess) {
            res.json({
                message: "SubCategories fetched successfully.",
                data: categoriess,
                success: true,
                error: false
            })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const deleteSubcat = async (req, res) => {
    try {
        const { id } = req.params;

        const categories = await subCategorySchema.deleteOne({ _id: id });

        res.json({
            message: "Category deleted successfully.",
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

export const updateSubcat = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {

        let categories = await subCategorySchema.findById(id);

        if (!id) return res.status(400).json({ error: "ID not found" });

        categories.name = name || category.name;

        categories = await categories.save();

        res.json({
            message: "Category updated successfully.",
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