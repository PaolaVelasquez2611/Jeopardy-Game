import React from 'react';
import './PriceBox.css';

const PriceBox = ({ price, onClick, isDisabled, isCorrect, hasAnswered }) => {
  // Determine the CSS class to apply based on the states
  const boxClass = hasAnswered
    ? isCorrect
      ? 'correct-answer'  // Green for correct answers
      : 'wrong-answer'    // Red for wrong answers
    : isDisabled
    ? 'disabled'         // Gray for disabled boxes
    : '';                // Default for enabled boxes (white)

  return (
    <td>
      <button
        className={`price-box ${boxClass}`}
        onClick={onClick}
        disabled={hasAnswered || isDisabled}  // Disable button if already answered or should be disabled
      >
        {price}
      </button>
    </td>
  );
};

export default PriceBox;
