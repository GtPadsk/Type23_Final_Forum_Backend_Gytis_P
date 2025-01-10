
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    answer_text: {
        type: String,
        required: true
    },
    date: {
        type: Date().toISOString(),
        required: true
    },
    gained_likes_number: {
        type: Number,
        required: true
    },
    questrion_id: {
        type: String,
        required: true
    }
}
    ,
    { timestamps: true });

export default mongoose.model("answer", answerSchema);