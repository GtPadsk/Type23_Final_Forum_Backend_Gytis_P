import express from "express";
import authUser from "../middleware/auth.js";

import {
    POST_QUESTION,
    GET_QUESTIONS,
    DELETE_QUESTION,
} from "../controller/question.js"


const router = express.Router();

router.get("/", GET_QUESTIONS);

router.post("/", authUser, POST_QUESTION);
router.delete("/:id", authUser, DELETE_QUESTION)


export default router;