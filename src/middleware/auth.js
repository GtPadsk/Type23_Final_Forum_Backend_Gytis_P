import jwt from "jsonwebtoken";


const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" })
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
            password: decoded.password
        }

        next()
    })
}

export default authUser