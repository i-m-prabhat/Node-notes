import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,  //reference to the user who created this todo
        ref: 'User'                           //the model that this field references
    }
}, { timestamps: true });

const SubTodo = mongoose.model('SubTodo', subTodoSchema);