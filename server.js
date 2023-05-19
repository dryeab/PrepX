require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// route imports
const routes = require("./routes");

app.use("/api/v1", routes);

app.listen(process.env.PORT, () =>
  console.log(`Server started listening at ${process.env.PORT}`)
);
