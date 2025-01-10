import express from "express";
import authUser from "../middleware/auth.js";

import {
    POST_ANSWER,
    GET_ANSWERS,
    DELETE_ANSWER,
} from "../controller/answer.js"


const router = express.Router();

router.get("/questions/:id/answers", authUser, GET_ANSWERS);
router.post("/question/:id/answers", authUser, POST_ANSWER);
router.delete("/answer/:id", authUser, DELETE_ANSWER)


export default router;