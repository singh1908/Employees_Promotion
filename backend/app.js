const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Read JSON Data
const readData = () => {
  const data = fs.readFileSync("developers.json", "utf-8");
  return JSON.parse(data);
};

// Normalize function (Min-Max Scaling)
const normalize = (value, min, max) =>
  max - min === 0 ? 0 : (value - min) / (max - min);

// Default Weights (Equal distribution initially)
const defaultWeights = {
  developmentFrequency: 0.1,
  leadTime: 0.15,
  cycleTime: 0.1,
  leadTimeChanges: 0.1,
  velocity: 0.15,
  workInProgress: 0.05,
  failureRate: 0.1,
  restoreTime: 0.1,
  csat: 0.15,
  peerRating: 0.1,
};

// Function to calculate developer scores
const calculateScore = (prioritizedMetrics, limit) => {
  const developers = readData();
  if (!developers.length) return [];

  const metrics = Object.keys(defaultWeights);

  // Compute min/max for normalization
  let minMax = {};
  metrics.forEach((metric) => {
    minMax[metric] = {
      min: Math.min(...developers.map((dev) => dev[metric])),
      max: Math.max(...developers.map((dev) => dev[metric])),
    };
  });

  // Adjust Weights Based on Prioritized Metrics
  let weights = { ...defaultWeights };

  if (prioritizedMetrics.length > 0) {
    let boostFactor = 1.5; // Increase priority metrics by 50%
    let remainingWeight =
      1 - prioritizedMetrics.length * boostFactor * (1 / metrics.length);
    let nonPrioritizedMetrics = metrics.filter(
      (m) => !prioritizedMetrics.includes(m)
    );

    // Ensure remaining weight is valid
    if (remainingWeight < 0) {
      boostFactor = 1 / prioritizedMetrics.length; // Avoid exceeding weight limit
      remainingWeight =
        1 - prioritizedMetrics.length * boostFactor * (1 / metrics.length);
    }

    prioritizedMetrics.forEach((metric) => {
      if (weights[metric]) weights[metric] *= boostFactor;
    });

    // Distribute remaining weight among non-prioritized metrics
    nonPrioritizedMetrics.forEach((metric) => {
      if (weights[metric])
        weights[metric] = remainingWeight / nonPrioritizedMetrics.length;
    });
  }

  // Normalize weights to ensure they sum to 1
  let totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  weights = Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, value / totalWeight])
  );

  // Compute scores
  const scoredDevelopers = developers.map((dev) => {
    let score = 0;
    metrics.forEach((metric) => {
      const normValue = normalize(
        dev[metric],
        minMax[metric].min,
        minMax[metric].max
      );
      score += normValue * weights[metric];
    });
    return { ...dev, score };
  });

  // Sort and return top 20 developers
  return scoredDevelopers.sort((a, b) => b.score - a.score).slice(0, limit);
};

// API Route: Clients Specify Metrics to Prioritize
app.get("/top-developers", (req, res) => {
  const prioritizedMetrics = Object.keys(req.query).filter(
    (key) => defaultWeights[key]
  );
  const limit = parseInt(req.query.limit) || 20;
  const topDevelopers = calculateScore(prioritizedMetrics, limit);
  res.json(topDevelopers);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);