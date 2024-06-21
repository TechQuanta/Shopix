import { mongoose } from 'mongoose';

const schema = new mongoose.Schema({
    productid: {
        type: String,
        required: [true, "Please provide the product id!"],
    },
    userid: {
        type: String,
        required: [true, "Please provide the customername!"],
    },
    productprice: {
        type: Number,
        required: [true, "Please provide the productprice!"],
    },
    productimage: {
        type: String,
        required: [true, "Please provide the productimage!"],
    },
    producttitle: {
        type: String,
        required: [true, "Please provide the producttitle!"],
    }
},
    {
        timestamps: true,
    }
);

const myListSchema = mongoose.model("myList", schema);

export default myListSchema
