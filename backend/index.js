const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/TodoRoutes");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/culture-travel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const options = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'cancelRequest',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
    ],
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/todos", todoRoutes);

app.get("/welcome", (req, res) => {
  res.status(200).send({ message: "Hi Welcome!" });
});

app.listen(8081, () => {
  console.log("Running on port 8081");
});
