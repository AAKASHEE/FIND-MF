const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
 
const app = express();
 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
 
app.use(express.json());
 
const FILE = path.join(__dirname, "locations.json");
 
// Safe helper to read locations
function readLocations() {
  try {
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, "[]");
      return [];
    }
    const raw = fs.readFileSync(FILE, "utf8").trim();
    if (!raw || raw === "") {
      fs.writeFileSync(FILE, "[]");
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    fs.writeFileSync(FILE, "[]");
    return [];
  }
}
 
app.post("/location", (req, res) => {
 
  const data = req.body;
 
  const mapsLink =
    `https://maps.google.com/?q=${data.latitude},${data.longitude}`;
 
  const locations = readLocations();
 
  locations.push({
    ...data,
    maps: mapsLink,
    receivedAt: new Date().toISOString()
  });
 
  fs.writeFileSync(FILE, JSON.stringify(locations, null, 2));
 
  console.log("LOCATION RECEIVED:", data);
  console.log("GOOGLE MAPS:", mapsLink);
 
  res.json({ success: true, maps: mapsLink });
 
});
 
app.get("/locations", (req, res) => {
  const locations = readLocations();
  res.json(locations);
});
 
app.get("/", (req, res) => {
  res.json({
    status: "Backend API running",
    endpoints: {
      post: "/location",
      get: "/locations"
    }
  });
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});