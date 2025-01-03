import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "bad token" });
    }
    const tokenWithoutBearer = token.startsWith('Bearer') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "bad token" });
        }

        req.body.email = decoded.email;
        req.body.password = decoded.password;

        next();
    })
}

export default authUser