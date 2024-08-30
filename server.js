const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const register = require("./routes/user.js");
const authenticateToken = require("./routes/user.js");

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MongoDbURI, { dbName: "Redux" })
  .then((data) => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("", register);
app.use("", authenticateToken);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
