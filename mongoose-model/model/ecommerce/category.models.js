import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the Category"]
    },
    imageUrl: {
        type: String,
        default: null
    }
}, { timestamps: true });


export const Category = mongoose.model("Category".categorySchema);