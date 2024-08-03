import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import { decode } from "html-entities";

function App() {
  const [started, setStarted] = useState(false);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function getQuizData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5", {
        signal: controller.signal,
      });
      const responseData = await res.json();
      setQuizData(responseData.results);
    }
    getQuizData();
    return () => controller.abort();
  }, []);

  function shuffleAndDecode(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
    }
    return arr.map((value) => decode(value));
  }

  const questionAnswers = quizData.map((quizDataObject) => ({
    question: decode(quizDataObject.question),
    answers: shuffleAndDecode([
      quizDataObject.correct_answer,
      ...quizDataObject.incorrect_answers,
    ]),
  }));

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
        <Quiz questionAnswers={questionAnswers} />
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
