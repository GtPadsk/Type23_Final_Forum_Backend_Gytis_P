import express from "express";
import questionModel from "../model/question.js";
import authUser from "../middleware/auth.js";

import {
    POST_QUESTION,
    GET_QUESTIONS,
    DELETE_QUESTION,
} from "../controller/question.js"


const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const question = await questionModel.findById(id);
        if (!question) {
            res.json(question)
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/", GET_QUESTIONS);

router.post("/", authUser, POST_QUESTION);
router.delete("/:_id", authUser, DELETE_QUESTION)


export default router;