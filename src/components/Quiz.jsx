import Question from "./Question";
import PropTypes from "prop-types";

export default function Quiz({ questionAnswers }) {
  // console.log(quizData);

  return (
    <main>
      <section>
        {questionAnswers.map((value, index) => (
          <Question
            key={index}
            question={value.question}
            answers={value.answers}
          />
        ))}
      </section>
      <button className="quiz-button">Check answers</button>
    </main>
  );
}

Quiz.propTypes = {
  questionAnswers: PropTypes.array.isRequired,
};
