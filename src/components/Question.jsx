import PropTypes from "prop-types";
import { useState } from "react";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const selectedStyle = {
    backgroundColor: "#d6dbf5",
    border: "1px solid #dbdef0",
  };

  const answerChoiceElements = props.answers.map((answer, index) => (
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

  function handleChange(event) {
    const { value } = event.target;
    setSelectedAnswer(value);
  }

  return (
    <>
      <p className="question">{props.question}</p>
      <form>{answerChoiceElements}</form>
      <hr />
    </>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
};
