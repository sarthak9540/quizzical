import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import CTA from "./components/CTA";
import { decode } from "html-entities";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function getQuizData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5", {
        signal: controller.signal,
      });
      const resData = await res.json();
      setQuizData(resData.results);
    }
    getQuizData();
    return () => controller.abort();
  }, []);

  const questionAnswers = quizData.map((quizDataObject) => {
    const allAnswers = [
      quizDataObject.correct_answer,
      ...quizDataObject.incorrect_answers,
    ]
      .sort(() => 0.5 - Math.random())
      .map((answer) => decode(answer));
    return {
      question: decode(quizDataObject.question),
      answers: allAnswers,
      correctAnswer: decode(quizDataObject.correct_answer),
    };
  });

  const yellowTransformStyles = {
    transform: started && "translate(30px,-30px)",
  };

  const blueTransformStyles = {
    transform: started && "translate(-30px,30px)",
  };

  function handleStart() {
    setStarted(true);
  }

  // function handleSubmit() {
  //   setSubmitted(true);
  // }

  // function handleReset() {
  //   setStarted(false);
  // }

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
        <CTA handleStart={handleStart} />
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
