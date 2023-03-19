import React, { useState } from "react";

function GuessingGame({ generatedPrompt }) {
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(null);

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted guess: ", guess);

    // Send the generated prompt and the user's guess to the server to calculate the score
    const response = await fetch("/api/calculate-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: generatedPrompt, guess }),
    });

    const data = await response.json();
    console.log("Score data:", data);

    if (data && data.score) {
      setScore(data.score);
    } else {
      console.error("Failed to get score from response");
    }
  };

  return (
    <div>
      <form onSubmit={handleGuessSubmit}>
        <label>
          Guess:
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit Guess</button>
      </form>
      {score && <p>Score: {score}</p>}
    </div>
  );
}

export default GuessingGame;
