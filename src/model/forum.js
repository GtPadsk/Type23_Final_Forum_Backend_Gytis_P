
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    question_title: {
        type: String,
        required: true
    },
    question_text: {
        type: String,
        required: true
    }

}
    ,
    { timestamps: true });

export default mongoose.model("Forum", userSchema);