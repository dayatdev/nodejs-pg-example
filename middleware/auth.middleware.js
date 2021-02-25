const jwt = require("jsonwebtoken");
const db = require("../db");

const protect = async (req, res, next) => {
  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      accessToken = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

      const result = await db.query(
        "SELECT id, name, email FROM users WHERE id = $1",
        [decoded.id]
      );

      req.user = result.rows[0];

      next();
    } catch (error) {
      return res.status(401).json({
        status: "fail",
        error: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      status: "fail",
      error: "Unauthorized",
    });
  }
};

module.exports = {
  protect,
};
