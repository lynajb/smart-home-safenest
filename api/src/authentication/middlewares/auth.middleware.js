const jwt = require("jsonwebtoken");
const { decode } = require("../../utils/jws");

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.body.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ message: "You should sign in 🫡" });
    }
    req.user = decode(token);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: `Invalid Token \n ${error.message}` });
  }
};

module.exports = verifyToken;
