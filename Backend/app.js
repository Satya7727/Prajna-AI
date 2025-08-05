const express = require("express");
const cors = require("cors");
const getGeminiResponse = require("./Services/ai.service");
require("dotenv").config();
const app = express();
app.use(cors());

app.get("/Prajna", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const aiResponse = await getGeminiResponse(prompt);
    res.json({ responseText: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Backend running...");
});
