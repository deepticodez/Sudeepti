const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

// ✅ Allow all origins for dev — CORS FIX
app.use(cors());

// ✅ Middleware
app.use(express.json());

// ✅ Handle preflight (OPTIONS) requests — just in case
//app.options('*', cors());

app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required for analysis." });

  console.log("📩 Incoming text:", text);

  // Simulate TextRazor response or use real one
  return res.json({
    keywords: ["sample", "keywords", "for", "testing"],
    readability: 72,
    keywordDensity: 3.2,
    seoScore: 85,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
