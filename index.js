import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/route/user.js";
import forumRouter from "./src/route/forum.js";

dotenv.config()

const app = express()

app.use(cors({
    origin: (`${process.env.PORT_PATH}:${process.env.PORT}`),
    credentials: true,
}))

app.use(express.json())

mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.log(err)
    })

app.use(userRouter)
app.use(forumRouter)