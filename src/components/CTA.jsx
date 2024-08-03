import PropTypes from "prop-types";

export default function CTA({ handleStart }) {
  return (
    <main>
      <h1>Quizzical</h1>
      <p className="description">Some decription if needed</p>
      <button onClick={handleStart} className="start-button">
        Start quiz
      </button>
    </main>
  );
}

CTA.propTypes = {
  handleStart: PropTypes.func.isRequired,
};
