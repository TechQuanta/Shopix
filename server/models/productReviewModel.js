import { mongoose } from 'mongoose';

const schema = new mongoose.Schema({
    productid: {
        type: String,
        required: [true, "Please provide the product id!"],
    },
    customername: {
        type: String,
        required: [true, "Please provide the customername!"],
    },
    review: {
        type: String,
        required: [true, "Please enter the review"],
    },
    customerrating: {
        type: Number,
        required: [true, "Please enter the customerrating"],
        default: 1,
    },
    customerid: {
        type: String,
        required: [true, "Please enter the customerid"],
    },
    customerimage: {
        type: String,
        required: [true, "Please enter the customerimage"],
        default: 'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.avif',
    },
},
    {
        timestamps: true,
    }
);

const productReviewSchema = mongoose.model("productReview", schema);

export default productReviewSchema
