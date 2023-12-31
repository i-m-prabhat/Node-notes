import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    specializedIn: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
}, { timestamps: true });

export const Hospital = mongoose.model("Hospital", hospitalSchema);