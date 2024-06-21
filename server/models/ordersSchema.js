import { mongoose } from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the Category name!"],
    },
    phonenumber: {
        type: String,
        required: [true, "Please enter the phonenumber!"],
    },
    address: {
        type: String,
        required: [true, "Please enter the address"],
    },
    pincode: {
        type: String,
        required: [true, "Please enter the pincode"],
    },
    amount: {
        type: String,
        required: [true, "Please enter the amount"],
    },
    paymentid: {
        type: String,
        required: [true, "Please enter the paymentid"],
        default: "Cash On delivery",
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
    },
    userid: {
        type: String,
        required: [true, "Please enter the userid"],
    },
    products: [
        {
            productid: {
                type: String,
            },
            producttitle: {
                type: String,
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            },
            image: {
                type: String
            },
            total: {
                type: Number
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    },
    paymentmethod: {
        type: String,
        required: [true, "Please enter the paymentmethod"],
    },
    status: {
        type: String,
        default: 'pending',
    },
},
    {
        timestamps: true,
    }
);

const orderSchema = mongoose.model("Orders", schema);

export default orderSchema
