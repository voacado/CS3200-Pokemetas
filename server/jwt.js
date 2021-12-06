const {sign, verify} = require("jsonwebtoken");

const createTokens = (userID) => {
    return sign({ id: userId }, process.env.JWT_SECRET);
}

export default createTokens;