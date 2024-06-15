import { mongoose } from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the Category name!"],
        unique: true,
    },
    image: {
        type: String,
        required: [true, "Please select images to upload!"],
    },
    color: {
        type: String,
        required: [true, "Please enter the Color value"],
    },
},
    {
        timestamps: true,
    }
);

const CategorySchema = mongoose.model("Category", schema);

export default CategorySchema
