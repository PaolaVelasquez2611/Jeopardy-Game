import React from 'react';
import PriceBox from '../price-box/PriceBox';
import './GameTable.css';  // Import corresponding CSS file

const GameTable = ({ data, onSelect, selectedQuestions }) => {
  const categories = data[1].slice(2);  // Category labels from C1-L1
  const prices = data.slice(2, 11).map(row => row[0]);  // Prices from A3-A11

  return (
    <table className="game-table">
      <thead>
        <tr>
          {categories.map((category, index) => (
            <th key={index}>{category}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {prices.map((price, rowIndex) => (
          <tr key={rowIndex}>
            {data[rowIndex + 2].slice(2).map((question, cellIndex) => {
              const isDisabled = selectedQuestions.some(
                (sq) => sq.rowIndex === rowIndex && sq.cellIndex === cellIndex
              );
              return (
                <PriceBox
                  key={cellIndex}
                  price={price}
                  isDisabled={isDisabled}
                  onClick={() => onSelect(rowIndex, cellIndex)}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameTable;
