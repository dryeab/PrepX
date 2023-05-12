require("./config/config").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// route imports
const authRoutes = require("./routes/auth/auth");

app.use("/", authRoutes);

app.listen(process.env.PORT || 3000);
