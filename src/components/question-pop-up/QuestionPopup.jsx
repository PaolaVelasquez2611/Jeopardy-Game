import React from 'react';
import Timer from '../timer/Timer';
import './QuestionPopup.css';

const QuestionPopup = ({
  category,
  question,
  isBooleanQuestion,
  isMultipleChoice,
  multipleChoiceOptions,
  correctAnswer,
  userAnswer,
  hasAnswered,
  onClose,
  onAnswer
}) => {
  const correctMessages = [
    "Congratulations! Your answer is spot on!",
    "Well done! You nailed it!",
    "Excellent! You got the right answer!"
  ];

  const incorrectMessages = [
    `Good try! The correct answer was: ${correctAnswer}. Keep it up!`,
    `Almost! Your answer was ${userAnswer}, but the correct answer was: ${correctAnswer}. You'll get it next time!`,
    `Not quite right! The correct answer was: ${correctAnswer}. Don't give up!`
  ];

  const feedbackMessage = userAnswer === correctAnswer 
    ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
    : incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];

  const feedbackColor = userAnswer === correctAnswer ? 'feedback-correct' : 'feedback-wrong';

  return (
    <div className="question-popup">
      <h2 className="popup-category-title">{category}</h2>
      <div className="question-content">
        <h2>{question || "Loading question..."}</h2>
        <div className="button-container">
          <div className="buttons">
            {isBooleanQuestion && (
              <>
                <button className="false-button" onClick={() => onAnswer('FALSE')} disabled={hasAnswered}>False</button>
                <button className="true-button" onClick={() => onAnswer('TRUE')} disabled={hasAnswered}>True</button>
              </>
            )}
            {isMultipleChoice && multipleChoiceOptions.map((option, index) => (
              <button 
                key={index} 
                className={`option-${String.fromCharCode(65 + index).toLowerCase()}`} 
                onClick={() => onAnswer(String.fromCharCode(65 + index))} 
                disabled={hasAnswered}
              >
                {option}
              </button>
            ))}
            {!isBooleanQuestion && !isMultipleChoice && (
              <>
                <button className="wrong" onClick={() => onAnswer('Wrong')} disabled={hasAnswered}>Wrong</button>
                <button className="correct" onClick={() => onAnswer('Correct')} disabled={hasAnswered}>Correct</button>
              </>
            )}
          </div>
          {hasAnswered && (
            <p className={`answer-feedback ${feedbackColor}`}>{feedbackMessage}</p>
          )}
        </div>
      </div>
      <div className="end-section">
        <Timer />
        <button className="close-popup" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuestionPopup;