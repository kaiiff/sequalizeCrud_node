const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3007;
const notesRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");
require("./database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes call here
app.use("/api", notesRouter);
app.use("/user", userRouter);

// server call here
app.listen(port, () => {
  console.log(`App listen on port : http://localhost:${port}`);
});
