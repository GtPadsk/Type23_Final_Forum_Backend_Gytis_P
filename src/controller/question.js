import { v4 as uuidv4 } from "uuid";
import questionModel from "../model/question.js";

let questions = []

const GET_QUESTIONS = async (req, res) => {
    try {
        questions = await questionModel.find({ userId: req.body.userId })
        return res.status(200).json({ questions: questions })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some problems occured" })
    }
}


const POST_QUESTION = async (req, res) => {
    try {

        console.log('Request body:', req.body);

        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({
                message: "User must be logged in to post a question"
            })
        }

        const newQuestion = {
            id: uuidv4(),
            question_text: req.body.question_text,
            userId,
            date: new Date(),
        }

        console.log('New question object:', newQuestion);

        // const isQuestionExists = questions.some((question) =>
        //     question.question_title === req.body.question_title)

        // if (isQuestionExists) {
        //     return res.status(400).json({ message: "Question already exists" })
        // }

        const question = new questionModel(newQuestion)
        const response = await question.save()

        return res
            .status(201)
            .json({
                message: "Question added successfully",
                question: response
            })
    }
    catch (err) {
        console.error('Error details:', err.message, err.stack)
        return res.status(500).json({
            message: "Some problems occured",
            error: err.message
        })
    }
}

const DELETE_QUESTION = async (req, res) => {
    try {
        const question = await questionModel.findByIdAndDelete(req.params.id)
        return res
            .status(200)
            .json({
                response: "Question deleted successfully",
                question: question
            })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Some problems occured",
            error: err.message,
        })
    }
}


export {
    POST_QUESTION,
    GET_QUESTIONS,
    DELETE_QUESTION,
}
