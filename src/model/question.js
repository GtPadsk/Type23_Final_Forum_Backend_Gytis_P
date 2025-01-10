
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    question_text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}
    ,
    { timestamps: true });

export default mongoose.model("question", questionSchema);