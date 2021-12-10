const {sign, verify} = require("jsonwebtoken");

/**
 * creates a JWT token to be stored in the cookies for login authetication
 * 
 * @param {Integer} userID the id of the user
 */
const createTokens = (userID) => {
    return sign({ id: userID }, process.env.JWT_SECRET);
}

/**
 * Given an instance of a request, checks that their JWT token is valid
 * 
 * @param req where the request came from
 * @param res where the response will be sent to
 */
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

/**
 * Gets the user id out of the JWT token
 * 
 * @param req where the request came from
 */
const getId = (req) => {
    const token = req.cookies["accessToken"];
    return verify(token, process.env.JWT_SECRET).id;
};

module.exports = { createTokens, validateToken, getId };