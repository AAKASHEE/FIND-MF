const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/location", (req, res) => {

  console.log("LOCATION RECEIVED:");
  console.log(req.body);

  res.json({
    success: true,
    message: "Location saved"
  });

});

app.get("/", (req, res) => {

  res.send("Backend running");

});

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});