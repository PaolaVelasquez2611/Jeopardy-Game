import React from 'react';
import PriceBox from '../price-box/PriceBox';
import './GameTable.css';

const GameTable = ({ data, onSelect, selectedQuestions, selectedColumn }) => {
  const categories = data[1].slice(2);  // Obtain categories from the second row
  const prices = data.slice(2, 11).map(row => row[0]);  // Obtain prices from rows A3-A11

  return (
    <table className="game-table">
      <thead>
        <tr>
          {categories.map((category, index) => (
            <th key={index} className={index === selectedColumn ? 'highlight' : ''}>{category}</th>  // Highlight the selected column
          ))}
        </tr>
      </thead>
      <tbody>
        {prices.map((price, rowIndex) => (
          <tr key={rowIndex}>
            {data[rowIndex + 2].slice(2).map((question, cellIndex) => {
              const selected = selectedQuestions.find(
                (sq) => sq.rowIndex === rowIndex && sq.cellIndex === cellIndex
              );
              const hasAnswered = !!selected;
              const isCorrect = selected ? selected.isCorrect : null;
              const isDisabled = selectedColumn !== null && selectedColumn !== cellIndex;  // Disabled if the column is not selected

              return (
                <PriceBox
                  key={cellIndex}
                  price={price}
                  isDisabled={isDisabled}  // Disable if not the selected column
                  hasAnswered={hasAnswered}  // Check if already answered
                  isCorrect={isCorrect}  // Check if answered correctly
                  onClick={() => !hasAnswered && onSelect(rowIndex, cellIndex)}  // Only allow selection if not already answered
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
