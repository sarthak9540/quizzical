import Question from "./Question";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

export default function Quiz({ questionAnswers }) {
  const [submitted, setSubmitted] = useState(false);
  const correctSelected = useRef([false, false, false, false, false]);
  let numberOfCorrect = useRef(0);

  function checkCorrectSelected(selectedAnswer, correctAnswer, index) {
    if (selectedAnswer === correctAnswer) {
      correctSelected.current[index] = true;
    } else {
      correctSelected.current[index] = false;
    }
    console.log(correctSelected);
  }

  function handleSubmit() {
    for (let i = 0; i < 5; i++) {
      if (correctSelected.current[i] === true) {
        numberOfCorrect.current = numberOfCorrect.current + 1;
      }
    }
    setSubmitted(true);
  }

  function refreshPage() {
    window.location.reload();
  }

  // console.log(questionAnswers);
  return (
    <main>
      <section>
        {questionAnswers.map((value, index) => (
          <Question
            key={index}
            index={index}
            submitted={submitted}
            question={value.question}
            answers={value.answers}
            correctAnswer={value.correctAnswer}
            checkCorrectSelected={checkCorrectSelected}
          />
        ))}
      </section>
      {submitted ? (
        <div className="sumbitted-info-content">
          <p className="score-info">
            You scored {numberOfCorrect.current}/5 correct answers
          </p>
          <button onClick={refreshPage} className="quiz-button">
            Play again
          </button>
        </div>
      ) : (
        <button onClick={handleSubmit} className="quiz-button">
          Check answers
        </button>
      )}
    </main>
  );
}

Quiz.propTypes = {
  questionAnswers: PropTypes.array.isRequired,
};
