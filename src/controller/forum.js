import { v4 as uuidv4 } from "uuid"
import forumModel from "../model/forum.js";

let forum_questions = []

const POST_QUESTION = async (req, res) => {
    try {
        const newQuestion = {
            id: uuidv4(),
            question_title: req.body.question_title,
            question_text: req.body.question_text
        }

        const isQuestionExists = forum_questions.some((question) =>
            question.question_title === req.body.question_title)

        if (isQuestionExists) {
            return res.status(400).json({ message: "Question already exists" })
        }

        const question = new forumModel(newQuestion)

        const response = await question.save()

        return res
            .status(201)
            .json({ response: "Question added successfully", question: response })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some problems occured" })
    }
}

export {
    POST_QUESTION,

}