const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../db");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (existingUser.rows.length) {
    res.status(400).json({
      status: "fail",
      error: "Email already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  const jwtPayload = {
    id: user.rows[0].id,
  };

  const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("accessToken", accessToken);

  res.status(201).json({
    status: "success",
    data: {
      accessToken,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (!user.rows.length) {
    return res.status(400).json({
      status: "fail",
      error: "Invalid credentials",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!passwordMatch) {
    return res.status(400).json({
      status: "fail",
      error: "Invalid credentials",
    });
  }

  const jwtPayload = {
    id: user.rows[0].id,
  };

  const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("accessToken", accessToken);

  res.status(201).json({
    status: "success",
    data: {
      accessToken,
    },
  });
};

module.exports = {
  signup,
  signin,
};
