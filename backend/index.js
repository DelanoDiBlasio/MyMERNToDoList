const winston = require("winston");
const cors = require("cors");
const todos = require("./routes/todos");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");
const express = require("express");
const mongoose = require("mongoose");

//this is where all the backend magic happens

winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyprint: true }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (error) => {
  throw error;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

//Routing
app.use("/api/todos", todos);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);

//getting api for backend 
app.get("/", (req, res) => {
  res.send("welcome to the todos api...");
});

//port and uri 
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

//listening on port
app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

//mongoose connetion
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
