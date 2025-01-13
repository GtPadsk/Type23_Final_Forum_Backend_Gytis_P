import { v4 as uuidv4 } from "uuid";
import questionModel from "../model/question.js";
import answerModel from "../model/answer.js";

const GET_ANSWERS = async (req, res) => {
    try {

        const question = await questionModel.findById(req.params.id)
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const answers = await answerModel.find({ question_id: req.params.id })
        return res.status(200).json({ answers: answers })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some problems occured" })
    }
}

const POST_ANSWER = async (req, res) => {
    try {

        if (!req.body.answer_text) {
            return res.status(400).json({ message: "Answer text is required" });
        }

        const { id } = req.params;
        console.log("Received ID:", id);

        try {

            const question = await questionModel.findOne({
                $or: [{ _id: id }, { id: id }]
            })
            console.log("Question found:", question);

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            const newAnswer = {
                id: uuidv4(),
                answer_text: req.body.answer_text,
                date: Date(),
                gained_likes_number: 0,
                question_id: id
            }

            const response = await answerModel.create(newAnswer)
            console.log("Answer created:", response);


            return res.status(201).json({ response: "Answer added successfully", answer: response })
        }
        catch (error) {
            console.log("Error during ObjectId conversion or query:", error)
            return res.status(400).json({ message: "Invalid question ID format", error: error.message })
        }
    } catch (err) {
        console.log("Error adding answer:", err)
        return res.status(500).json({ message: "Some problems occured", error: err.message })
    }
}

const DELETE_ANSWER = async (req, res) => {
    try {

        const answer = await answerModel.findOne({
            id: req.params.answer_id,
            question_id: req.params.id,
        })

        if (!answer) {
            return res.status(404).json({
                message: "Answer not found"
            })
        }

        await answerModel.deleteOne({ id: req.params.answer_id })
        return res.status(200).json({ message: "Answer deleted successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some problems occured" })
    }
}


export {
    GET_ANSWERS,
    POST_ANSWER,
    DELETE_ANSWER
}