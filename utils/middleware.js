const User = require("../models/users");
const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
  const auth = req.get("Authorization");
  if (auth && auth.startsWith("Bearer ")) {
    req["token"] = auth.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const Token = req.token;

  if (!Token) {
    return res.status(401).json({ error: "there is no token" });
  }

  const decodedToken = jwt.verify(Token, process.env.SECRET);

  if (!decodedToken) {
    return response.status(401).json({ error: "Token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  req["user"] = user;
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
