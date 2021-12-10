const {sign, verify} = require("jsonwebtoken");

const createTokens = (userID) => {
    return sign({ id: userID }, process.env.JWT_SECRET);
    // return sign({ id: userID }, '3k243hfsdih5f');
}

const validateToken = (req, res) => {
    const token = req.cookies["accessToken"];

    if (!token) {
        res.status(400).json("User not authenticated.");
        return false;
    }

    try {
        const validToken = verify(token, process.env.JWT_SECRET)
        if (validToken) {
            req.authenticated = true;
            return true;
        }
    } catch(err) {
        res.status(400).json({Error: err});
        return false;
    }
}

const getId = (req) => {
    const token = req.cookies["accessToken"];
    return verify(token, process.env.JWT_SECRET).id;
};

module.exports = { createTokens, validateToken, getId };