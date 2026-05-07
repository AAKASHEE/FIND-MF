const express = require("express");
const cors = require("cors");
 
const app = express();
 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
 
app.use(express.json());
 
// Store locations in memory (no file system needed)
let locations = [];
 
app.post("/location", (req, res) => {
 
  const data = req.body;
 
  const mapsLink =
    `https://maps.google.com/?q=${data.latitude},${data.longitude}`;
 
  locations.push({
    ...data,
    maps: mapsLink,
    receivedAt: new Date().toISOString()
  });
 
  console.log("LOCATION RECEIVED:", data);
  console.log("GOOGLE MAPS:", mapsLink);
 
  res.json({ success: true, maps: mapsLink });
 
});
 
app.get("/locations", (req, res) => {
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