import React from 'react';
import Timer from '../timer/Timer';
import './QuestionPopup.css';  // Import corresponding CSS file

const QuestionPopup = ({
  question,
  isBooleanQuestion,
  isMultipleChoice,   // New prop to handle multiple-choice questions
  multipleChoiceOptions, // New prop for multiple-choice options
  correctAnswer,
  userAnswer,  
  hasAnswered,
  onClose,
  onAnswer
}) => {
  return (
    <div className="question-popup">
      <div className="question-content">
        <h2>{question || "Loading question..."}</h2> {/* Display the question or a loading message */}
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
          ) : null}

          {/* Conditionally render buttons for multiple-choice questions (A, B, C) */}
          {!hasAnswered && isMultipleChoice ? (
            <>
              <button className="option-a" onClick={() => onAnswer('A')}>{multipleChoiceOptions[0]}</button>
              <button className="option-b" onClick={() => onAnswer('B')}>{multipleChoiceOptions[1]}</button>
              <button className="option-c" onClick={() => onAnswer('C')}>{multipleChoiceOptions[2]}</button>
            </>
          ) : hasAnswered && isMultipleChoice ? (
            <p className="answer-feedback">
              Your answer: {userAnswer}. The correct answer was: {correctAnswer}  {/* Show user's answer and correct answer */}
            </p>
          ) : null}

          {/* Render for manual correct/wrong input if it's not boolean or multiple-choice */}
          {!hasAnswered && !isBooleanQuestion && !isMultipleChoice ? (
            <>
              <button className="correct" onClick={() => onAnswer('Correct')}>Correct</button>
              <button className="wrong" onClick={() => onAnswer('Wrong')}>Wrong</button>
            </>
          ) : null}
        </div>
      </div>
      <Timer></Timer>
      <button className="close-popup" onClick={onClose}>Close</button>
    </div>
  );
};

export default QuestionPopup;
