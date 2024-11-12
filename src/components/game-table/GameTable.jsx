import React from 'react';
import PriceBox from '../price-box/PriceBox';
import './GameTable.css';

const GameTable = ({ data, onSelect, selectedQuestions, selectedColumn }) => {
  // Filter only category columns (ignore the columns with answers)
  const categories = data[1].filter((_, index) => ![4, 7, 10, 13, 16, 19, 22, 25, 28, 31].includes(index)); //Los #s representan las columnas del Excel que quiero incluir (A=1)
  //console.log("categories", categories); // Only 10 categories should be here now

  // Extract prices (points) for each row from the first column (Column A)
  const prices = data
    .slice(2, 19) // Slice the rows for the game board
    .filter((_, rowIndex) => ![2, 3, 4, 5, 7, 8, 9,10].includes(rowIndex)) // Filter out rows that don't belong to the board
    .map(row => row[0]); // Get the price from column A

  return (
    <table className="game-table">
      <thead>
        <tr>
          {categories.map((category, index) => (
            <th key={index} className={index === selectedColumn ? 'highlight' : ''}>
              {category}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {prices.map((price, rowIndex) => (
          <tr key={rowIndex}>
            {/* Map over only the correct number of cells (10 columns) */}
            {data[rowIndex + 2] // Ensure you're mapping the correct row data by offsetting with `+2`
              .filter((_, index) => ![1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31].includes(index)) // Filter out unwanted columns
              .slice(0, 10) // Limit to the first 10 cells (corresponding to the 10 categories)
              .map((_, cellIndex) => {
                const selected = selectedQuestions.find(
                  (sq) => sq.rowIndex === rowIndex && sq.cellIndex === cellIndex
                );
                const hasAnswered = !!selected;
                const isCorrect = selected ? selected.isCorrect : null;

                // Disable all cells when `selectedColumn` is null, only enable the selected column
                const isDisabled = selectedColumn === null || selectedColumn !== cellIndex;

                return (
                  <PriceBox
                    key={cellIndex}
                    price={price} // Assign the price from the prices array
                    isDisabled={isDisabled}
                    hasAnswered={hasAnswered}
                    isCorrect={isCorrect}
                    onClick={() => !hasAnswered && onSelect(rowIndex, cellIndex)}
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
