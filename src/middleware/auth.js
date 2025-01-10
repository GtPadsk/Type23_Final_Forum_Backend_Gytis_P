import jwt from "jsonwebtoken";


const authUser = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "no token found" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "bad auth token" })
        }

        req.body.userId = decoded.id
        req.body.userEmail = decoded.email
        req.body.userPassword = decoded.password

        next()
    })
}

export default authUser