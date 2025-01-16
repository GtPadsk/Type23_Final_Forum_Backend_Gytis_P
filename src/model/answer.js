
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    answer_text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    gained_likes_number: {
        type: Number,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "question"
    }
}
    ,
    { timestamps: true });

export default mongoose.model("answer", answerSchema);