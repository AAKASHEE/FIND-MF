const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const FILE = "locations.json";

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

app.post("/location", (req, res) => {

  const data = req.body;

  const mapsLink =
    `https://maps.google.com/?q=${data.latitude},${data.longitude}`;

  const locations =
    JSON.parse(fs.readFileSync(FILE));

  locations.push({
    ...data,
    maps: mapsLink
  });

  fs.writeFileSync(
    FILE,
    JSON.stringify(locations, null, 2)
  );

  console.log("LOCATION RECEIVED:");
  console.log(data);

  console.log("GOOGLE MAPS:");
  console.log(mapsLink);

  res.json({
    success: true,
    maps: mapsLink
  });

});

app.get("/locations", (req, res) => {

  const locations =
    JSON.parse(fs.readFileSync(FILE));

  res.json(locations);

});

app.get("/", (req, res) => {

  res.send("Backend running");

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});