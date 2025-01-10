import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.js";

const REGISTER = async (req, res) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
        };

        const user = new userModel(newUser);

        const response = await user.save();

        return res
            .status(201)
            .json({ response: "User added successfully", user: response });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Some problems occured" });
    }
}

const LOGIN = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordsMatch = bcrypt.compareSync(password, user.password);
        if (!isPasswordsMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        return res
            .status(200)
            .json({ response: "User logged in successfully", token: token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Some problems occured" });
    }
}
export {
    REGISTER,
    LOGIN
}