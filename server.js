const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Placement Predictor API Running");
});

// Prediction API
app.post("/predict", (req, res) => {
  const { cgpa, skills, internship, communication } = req.body;

  let score = 0;

  // CGPA logic
  if (cgpa >= 8) score += 40;
  else if (cgpa >= 7) score += 30;
  else if (cgpa >= 6) score += 20;

  // Skills logic
  score += skills * 7; // max 28

  // Internship logic
  if (internship === "yes") score += 20;

  // Communication logic
  score += communication;

  if (score > 100) score = 100;

  let status, roadmap;

  if (score >= 75) {
    status = "High Placement Probability";
    roadmap = "Focus on mock interviews and company-specific preparation.";
  } else if (score >= 50) {
    status = "Moderate Placement Probability";
    roadmap = "Improve DSA, build projects, and enhance communication skills.";
  } else {
    status = "Low Placement Probability";
    roadmap = "Focus on fundamentals, internships, and consistent practice.";
  }

  res.json({
    placementScore: score,
    status: status,
    roadmap: roadmap
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
