const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const stringSimilarity = require("string-similarity");

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = <TODO INSERT API KEY HERE>

app.use(cors());
app.use(express.json());

app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, num_images, size } = req.body;

    const openaiResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "image-alpha-001",
        prompt,
        num_images,
        size: `${size[0]}x${size[1]}`, // Convert the size array to a string in the format "256x256"
        response_format: "url",
      }),
    });

    if (!openaiResponse.ok) {
      console.error("Response received from OpenAI API:", openaiResponse);
      const errorResponse = await openaiResponse.json();
      console.error("Error response JSON:", errorResponse);
      res.status(500).json({ error: "Failed to fetch image" });
    } else {
      const data = await openaiResponse.json();
      res.json(data);
    }
  } catch (error) {
    console.error("Error occurred during the request:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

app.post("/api/calculate-score", (req, res) => {
  try {
    const { prompt, guess } = req.body;

    // Calculate the similarity score between the prompt and the guess using the string-similarity package
    const score = Math.round(stringSimilarity.compareTwoStrings(prompt, guess) * 5000);

    res.json({ score });
  } catch (error) {
    console.error("Error occurred during the request:", error);
    res.status(500).json({ error: "Failed to calculate score", message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});