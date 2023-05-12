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

app.use("/api", routes);

const server = app.listen(process.env.PORT || 3000, () =>
  console.log("Server started listening")
);

server.setTimeout(30_000_000, () => console.log("Time out passed"));
