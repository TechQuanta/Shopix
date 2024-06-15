import { mongoose } from 'mongoose';

const schema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please enter the Category name!"],
    },
    name: {
        type: String,
        required: [true, "Please select subcategory name"],
    },
},
    {
        timestamps: true,
    }
);

const subCategorySchema = mongoose.model("subCategory", schema);

export default subCategorySchema
