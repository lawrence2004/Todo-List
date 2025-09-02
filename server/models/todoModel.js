import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

export const Todo = mongoose.model("Todo", todoSchema);