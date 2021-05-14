const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "zelfgekozen_secret_string_hoe_langer_hoe_veiliger");
    next();
  } catch (error) {
    res.status(401).json({ message: "Authenticatie mislukt." });
  }
};
