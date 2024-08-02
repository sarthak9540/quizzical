import { useEffect, useState } from "react";
import Question from "./Question";

export default function Quiz() {
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

  console.log(quizData);

  return (
    <section>
      {quizData.map((value, index) => (
        <Question
          key={index}
          question={value.question}
          correctAnswer={value.correct_answer}
          incorrectAnswers={value.incorrect_answers}
        />
      ))}
    </section>
  );
}
