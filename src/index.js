require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Successfully loaded get route." });
});

app.post("/", (req, res) => {
  const envVarValue = process.env.DUMMY_VALUE || "not found";
  res.json({ message: "Post route successfully loaded", envVarValue });
});

const port = process.env.PORT || 3002;

app.listen(port);
console.log("app is running at http://localhost:" + port);
