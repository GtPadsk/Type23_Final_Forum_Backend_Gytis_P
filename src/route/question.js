import express from "express";
import authUser from "../middleware/auth.js";

import {
    POST_QUESTION,
    GET_QUESTIONS,
    DELETE_QUESTION,
} from "../controller/question.js"


const router = express.Router();

router.get("/questions", authUser, GET_QUESTIONS);
router.post("/question", authUser, POST_QUESTION);
router.delete("/question/:id", authUser, DELETE_QUESTION)


export default router;