import { v4 as uuidv4 } from "uuid";
import questionModel from "../model/question.js";
import answerModel from "../model/answer.js";
import mongoose from "mongoose";

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

        const questionId = mongoose.Types.ObjectId(req.params.id)
        const question = await questionModel.findById(questionId)


        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const newAnswer = {
            id: uuidv4(),
            answer_text: req.body.answer_text,
            date: new Date().toISOString(),
            gained_likes_number: 0,
            question_id: req.params.id
        }

        if (!Array.isArray(question.answers)) {
            question.answers = [];
        }

        question.answers.push(newAnswer)
        const response = await question.save()

        return res.status(201).json({ response: "Answer added successfully", answer: response })

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