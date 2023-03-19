import React, { useState } from "react";

function GuessingGame() {
  const [guess, setGuess] = useState("");

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted guess: ", guess);
    // You can put your game logic here
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
    </div>
  );
}

export default GuessingGame;
