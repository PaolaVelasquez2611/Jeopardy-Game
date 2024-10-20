import React from 'react';
import './QuestionPopup.css';  // Import corresponding CSS file

const QuestionPopup = ({ question, isBooleanQuestion, onClose, onCorrect, onWrong }) => {
  return (
    <div className="question-popup">
      <div className="question-content">
        <h2>{question}</h2>
        <div className="buttons">
          {/* Conditionally render buttons for boolean questions (True/False) */}
          {isBooleanQuestion ? (
            <>
              <button className="correct" onClick={onCorrect}>True</button>
              <button className="wrong" onClick={onWrong}>False</button>
            </>
          ) : (
            <>
              <button className="correct" onClick={onCorrect}>Correct</button>
              <button className="wrong" onClick={onWrong}>Wrong</button>
            </>
          )}
        </div>
      </div>
      <button className="close-popup" onClick={onClose}>Close</button>
    </div>
  );
};

export default QuestionPopup;
