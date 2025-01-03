import express from "express";

import {
    POST_QUESTION,
} from "../controller/forum.js"


const router = express.Router();

router.post("/question", POST_QUESTION);

export default router;