import CategorySchema from "../models/categorySchema.js";
import productModel from "../models/productModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
    const { name, brandname, category, images, price, sellingprice, description, stock, userId, isFeatured, rams, weight, size, subcat } = req.body;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: "User not found" });

        let Category = await CategorySchema.findOne({ name: category })

        if (user.role === "buyer") return res.status(400).json({ error: "User must be admin ore seller" });

        // if (!Category) return res.status(400).json({ error: "Category not found!" });

        const newProduct = new productModel({
            name,
            brandname,
            category: category,
            price,
            sellingprice,
            description,
            stock,
            isFeatured,
            weight,
            size,
            rams,
            subcat,
            uploadedby: userId,
        });

        await newProduct.save();

        await productModel.findByIdAndUpdate(newProduct._id, { $push: { images: images } });

        res.json({
            message: "Product added successfully.",
            data: newProduct,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
        console.log(err);
    }
};

export const getAllProducts = async (req, res) => {
    try {

        const products = await productModel.find();

        res.json({
            message: "Products fetched successfully.",
            data: products,
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

export const getAllProductsById = async (req, res) => {
    try {
        const { id } = req.params;

        const products = await productModel.findById(id);

        res.json({
            message: "Products fetched successfully.",
            data: products,
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

export const getLatestProducts = async (req, res) => {
    try {

        const products = await productModel.find().sort({ _id: -1 });

        res.json({
            message: "Latest Products fetched successfully.",
            data: products,
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

export const getAllProductsLess = async (req, res) => {
    try {

        const products = await productModel.find().select("-createdAt").select("-updatedAt").select("-description").select("-images").select("-orderedby").select("-ratings").select("-_id").select("-__v");

        res.json({
            message: "Products fetched successfully.",
            data: products,
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

export const updateProduct = async (req, res) => {
    const { name, brandname, category, price, sellingprice, description, stock, productId, isFeatured, rams, weight, size, subcat } = req.body;

    try {
        let product = await productModel.findById(productId);
        if (!product) return res.status(400).json({ error: "Product not found" });

        // if (req.params.id !== userId.toString())
        // 	return res.status(400).json({ error: "You cannot update other user's profile" });

        product.name = name || product.name;
        product.brandname = brandname || product.brandname;
        product.category = category || product.category;
        product.price = price || product.price;
        product.sellingprice = sellingprice || product.sellingprice;
        product.description = description || product.description;
        product.stock = stock || product.stock;
        product.isFeatured = isFeatured || product.isFeatured;
        product.rams = rams || product.rams;
        product.weight = weight || product.weight;
        product.size = size || product.size;
        product.subcat = subcat || product.subcat;

        product = await product.save();

        res.json({
            message: "Product updated Successfully",
            data: product,
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

export const deleteProduct = async (req, res) => {
    try {

        const { Id } = req.body;

        const product = await productModel.findById(Id);

        if (!product) return res.status(400).json({ error: "ID not found" });

        await productModel.deleteOne({ _id: Id });

        res.json({
            message: "Products deleted successfully.",
            data: product,
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

export const getCategoryWuseProduct = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("brandname")

        const productByCategory = []

        for (const brandname of productCategory) {
            const product = await productModel.findOne({ brandname })

            if (product) {
                productByCategory.push(product)
            }
        }


        res.json({
            message: "category product",
            data: productByCategory,
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
}

export const getCategoryProduct = async (req, res) => {
    try {

        const { category } = req.params;

        const productCategory = await productModel.find({ subcat: category })

        res.json({
            message: category + " category product",
            data: productCategory,
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
}

export const getCatProduct = async (req, res) => {
    try {

        const { category } = req.params;

        const productCategory = await productModel.find({ category: category })

        res.json({
            message: category + " category product",
            data: productCategory,
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
}

export const getCatProductPage = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = 8;
        const totalPost = await productModel.find({ category: req.query.category });
        const totalPosts = totalPost?.length;
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ message: "Page not found" })
        }

        const productCategory = await productModel.find({ category: req.query.category }).skip((page - 1) * perPage).limit(perPage).exec();

        res.json({
            message: " category product",
            data: productCategory,
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
}

export const getSubCatProductPage = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = 8;
        const totalPost = await productModel.find({ subcat: req.query.category });
        const totalPosts = totalPost?.length;
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ message: "Page not found" })
        }

        const productCategory = await productModel.find({ subcat: req.query.category }).skip((page - 1) * perPage).limit(perPage).exec();

        res.json({
            message: " category product",
            data: productCategory,
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
}

export const filterProduct = async (req, res) => {
    try {
        let productList = []

        if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
            productList = await productModel.find({ subcat: req.query.subcat }).populate("category subcat");

            const filteredProducts = productList.filter(product => {
                if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
                    return false;
                }
                if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
                    return false;
                }
                return true;
            });

            if (!productList) {
                res.status(500).json({ success: false })
            }
            return res.status(200).json({
                data: filteredProducts,
                success: true,
                error: false
            })
        } else {
            productList = await productModel.find(req.query).populate("category subcat");
            if (!productList) {
                res.status(500).json({ success: false })
            }
            return res.status(200).json({
                data: productList,
                success: true,
                error: false
            })
        }

        const productCategory = await productModel.find(req.query);

        res.json({
            message: "Filtered category product",
            data: productCategory,
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
}

export const getCatWiseProduct = async (req, res) => {
    try {

        const { category } = req.params;

        const productCategory = await productModel.find({ category: category })

        const productCategorys = await productModel.find({ subcat: category })

        res.json({
            message: category + " category product",
            data: productCategory ? productCategory : productCategorys,
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
}

export const getFeaturedProduct = async (req, res) => {
    try {

        const { category } = req.params;

        const productCategory = await productModel.find({ isFeatured: true })

        res.json({
            message: category + " category product",
            data: productCategory,
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
}

export const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.json({
            message: "Product details",
            data: product,
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
}

export const getSearchedProducts = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(404).json({ message: "Query is required" });
        }

        const items = await productModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { brandname: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { subcat: { $regex: query, $options: 'i' } }
            ]
        });

        res.json({
            message: "Searched Products",
            data: items,
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
}