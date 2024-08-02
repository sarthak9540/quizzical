import PropTypes from "prop-types";
import { decode } from "html-entities";
import { useEffect, useState } from "react";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const question = decode(props.question);
  const answersArray = [props.correctAnswer, ...props.incorrectAnswers];
  const [answers, setAnswers] = useState([]);

  const selectedStyle = {
    backgroundColor: "#d6dbf5",
    border: "1px solid #dbdef0",
  };

  useEffect(() => {
    for (let i = answersArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = answersArray[i];
      answersArray[i] = answersArray[j];
      answersArray[j] = k;
    }
    setAnswers(answersArray);
  }, []);

  const answerChoiceElements = answers.map((answer, index) => (
    <label key={index} style={selectedAnswer === answer ? selectedStyle : {}}>
      <input
        type="radio"
        id={answer}
        name="answer"
        value={answer}
        checked={selectedAnswer === answer}
        onChange={handleChange}
      />
      {answer}
    </label>
  ));

  //   console.log(answers);

  function handleChange(event) {
    const { value } = event.target;
    setSelectedAnswer(value);
  }

  return (
    <>
      <p className="question">{question}</p>
      <form>{answerChoiceElements}</form>
      <hr />
    </>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.array.isRequired,
};
