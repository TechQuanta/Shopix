import { mongoose } from 'mongoose';

const schema = new mongoose.Schema({
    producttitle: {
        type: String,
        required: [true, "Please enter the product name!"],
        unique: true,
    },
    image: {
        type: String,
        required: [true, "Please select product images to upload!"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the price value"],
    },
    quantity: {
        type: Number,
        required: [true, "Please enter the quantity value"],
    },
    subtotal: {
        type: Number,
        required: [true, "Please enter the subtotal value"],
    },
    productid: {
        type: String,
        required: [true, "Please enter the productid value"],
    },
    userid: {
        type: String,
        required: [true, "Please enter the userid value"],
    },
},
    {
        timestamps: true,
    }
);

const cartSchema = mongoose.model("Cart", schema);

export default cartSchema
