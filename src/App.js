import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
  
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, num_images: 1, size: [256, 256] }),
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
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
        </label>
        <button type="submit">Generate Image</button>
      </form>

      {imageData && <img src={imageData} alt="Generated Image" />}
    </div>
  );
}

export default App;
