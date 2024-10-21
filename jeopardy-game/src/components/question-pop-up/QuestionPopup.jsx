import React from 'react';
import './QuestionPopup.css';  // Import corresponding CSS file

const QuestionPopup = ({
  question,
  isBooleanQuestion,
  correctAnswer,
  userAnswer,  // Receive userAnswer as a prop
  hasAnswered,
  onClose,
  onAnswer
}) => {
  return (
    <div className="question-popup">
      <div className="question-content">
        <h2>{question || "Loading question..."}</h2> {/* Display a loading message if question is not set */}
        <div className="buttons">
          {/* Conditionally render buttons for boolean questions (True/False) */}
          {!hasAnswered && isBooleanQuestion ? (
            <>
              <button className="true-button" onClick={() => onAnswer('TRUE')}>True</button>
              <button className="false-button" onClick={() => onAnswer('FALSE')}>False</button>
            </>
          ) : hasAnswered && isBooleanQuestion ? (
            <p className="answer-feedback">
              Your answer: {userAnswer}. The correct answer was: {correctAnswer}  {/* Show user's answer and correct answer */}
            </p>
          ) : (
            <>
              <button className="correct" onClick={() => onAnswer('Correct')}>Correct</button>
              <button className="wrong" onClick={() => onAnswer('Wrong')}>Wrong</button>
            </>
          )}
        </div>
      </div>
      <button className="close-popup" onClick={onClose}>Close</button>
    </div>
  );
};

export default QuestionPopup;
