import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/route/user.js";
import questionRouter from "./src/route/question.js"
import answerRouter from "./src/route/answer.js"
import bodyParser from "body-parser";

dotenv.config()

const app = express()

app.use(cors({
    origin: (`${process.env.PORT_PATH}:${process.env.PORT}`),
    credentials: true,
}))

app.use(bodyParser.json());
app.use(express.json())

mongoose
    .connect(`${process.env.MONGO_CONNECTION}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.log(err)
    })

app.use(userRouter)
app.use(questionRouter)
app.use(answerRouter)

app.use((req, res) => {
    res.status(404).json({ message: "your endpoint does not exist" })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

export default app