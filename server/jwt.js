const {sign, verify} = require("jsonwebtoken");

const createTokens = (userID) => {
    return sign({ id: userID }, process.env.JWT_SECRET);
    // return sign({ id: userID }, '3k243hfsdih5f');
}

const validateToken = (req, res, next) => {
    const token = req.cookies["accessToken"];

    if (!token) {
        res.status(400).json({Error: "User not authenticated."});
    }

    try {
        const validToken = verify(token, process.env.JWT_SECRET)
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch(err) {
        return res.status(400).json({Error: err});
    }
}

const getId = (req) => {
    const token = req.cookies["accessToken"];
    return verify(token, process.env.JWT_SECRET).id;
};

module.exports = { createTokens, validateToken, getId };