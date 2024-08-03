import PropTypes from "prop-types";
import { useState } from "react";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const selectedStyle = {
    backgroundColor: "#d6dbf5",
    border: "1px solid #dbdef0",
  };
  const correctStyle = {
    backgroundColor: "#94D7A2",
    border: "1px solid #94D7A2",
  };
  const wrongStyle = {
    backgroundColor: "#F8BCBC",
    border: "1px solid #F8BCBC",
    color: "rgba(41, 50, 100, 0.75)",
  };
  const submittedStyle = {
    opacity: "50%",
  };

  function handleChange(event) {
    const { value } = event.target;
    setSelectedAnswer(value);
    props.checkCorrectSelected(value, props.correctAnswer, props.index);
  }

  const answerChoiceElements = props.answers.map((answer, index) => (
    <label
      key={index}
      style={
        selectedAnswer === answer
          ? props.submitted
            ? selectedAnswer === props.correctAnswer
              ? correctStyle
              : wrongStyle
            : selectedStyle
          : props.submitted
          ? answer === props.correctAnswer
            ? correctStyle
            : submittedStyle
          : {}
      }
    >
      <input
        type="radio"
        id={answer}
        name="answer"
        value={answer}
        checked={selectedAnswer === answer}
        onChange={props.submitted ? undefined : handleChange}
      />
      {answer}
    </label>
  ));

  return (
    <>
      <p className="question">{props.question}</p>
      <form>{answerChoiceElements}</form>
      <hr />
    </>
  );
}

Question.propTypes = {
  index: PropTypes.number.isRequired,
  submitted: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  checkCorrectSelected: PropTypes.func.isRequired,
};
