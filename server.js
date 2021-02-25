require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const restaurantsRoute = require("./routes/restaurants.route");
const authRoute = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/restaurants", restaurantsRoute);
app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
