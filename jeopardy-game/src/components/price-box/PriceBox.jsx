import React from 'react';
import './PriceBox.css';  // Import corresponding CSS file

const PriceBox = ({ price, onClick, isDisabled }) => {
  return (
    <td>
      <button
        className={`price-box ${isDisabled ? 'disabled' : ''}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {price}
      </button>
    </td>
  );
};

export default PriceBox;
