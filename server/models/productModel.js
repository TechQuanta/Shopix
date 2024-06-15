import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brandname: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    sellingprice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    orderedby: {
        type: [String],
        default: [],
    },
    ratings: {
        type: [String],
        default: [],
    },
    uploadedby: {
        type: String,
        required: [true, "Please provide userid value"],
    },
    subcat: {
        type: String,
        default: "None",
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    rams:
    {
        type: String,
        default: "",
    },
    weight: {
        type: String,
        default: "",
    },
    size: {
        type: String,
        default: "",
    },
},
    {
        timestamps: true,
    }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;