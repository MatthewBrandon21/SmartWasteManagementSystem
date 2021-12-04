const jwt = require("jsonwebtoken");

const isAuth = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log("Am i admin ? ", req.user.isAdmin);
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(400).send("NotAdmin");
  next();
};

module.exports = {
  isAuth,
  isAdmin,
};
