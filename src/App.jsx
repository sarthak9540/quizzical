import { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  const [started, setStarted] = useState(false);

  const yellowTransformStyles = {
    transform: started && "translate(30px,-30px)",
  };

  const blueTransformStyles = {
    transform: started && "translate(-30px,30px)",
  };

  function handleStart() {
    setStarted(true);
  }

  return (
    <>
      <img
        className="blob-yellow"
        src="src\assets\blob - yellow.png"
        alt="blob - yellow"
        style={yellowTransformStyles}
      />
      {started ? (
        <Quiz />
      ) : (
        <main>
          <h1>Quizzical</h1>
          <p className="description">Some decription if needed</p>
          <button onClick={handleStart} className="start-button">
            Start quiz
          </button>
        </main>
      )}
      <img
        className="blob-blue"
        src="src\assets\blob - blue.png"
        alt="blob - blue"
        style={blueTransformStyles}
      />
    </>
  );
}

export default App;
