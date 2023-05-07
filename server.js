require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route imports
const authRoutes = require("./routes/auth");

app.use("/", authRoutes);

app.listen(process.env.PORT || 3000);
