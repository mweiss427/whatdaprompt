import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, num_images: 1, size: [512, 512] }),
    });

    const data = await response.json();
    console.log("Image data:", data);

    if (data && data.data && data.data[0] && data.data[0].url) {
      setImageData(data.data[0].url);
    } else {
      console.error("Failed to get image URL from response");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess the Prompt</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="password"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Enter your prompt"
          />
        </label>
        <button type="submit">Generate Image</button>
      </form>

      {imageData && (
        <div className="image-container">
          <img src={imageData} alt="Generated Image" className="image" />
          <button className="show-prompt" onClick={() => setShowPrompt(!showPrompt)}>
            {showPrompt ? "Hide Prompt" : "Show Prompt"}
          </button>
          {showPrompt && <p className="prompt">{prompt}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
