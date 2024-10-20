import React, { useState } from 'react';
import UploadScreen from './components/upload-screen/UploadScreen';
import GameTable from './components/game-table/GameTable';
import QuestionPopup from './components/question-pop-up/QuestionPopup';
import RouletteLights from './components/roulette-lights/RouletteLights';

const App = () => {
  const [data, setData] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);  // Columna seleccionada por la ruleta
  const [isBooleanQuestion, setIsBooleanQuestion] = useState(false);  // New state to track if it's a boolean question

  const handleFileUpload = (parsedData) => {
    setData(parsedData);
  };

  const handleSelectQuestion = (rowIndex, cellIndex) => {
    let question;
    var row, column;

    // Adjust the offsets based on the rowIndex
    if (rowIndex === 0 || rowIndex === 1) {
      row = rowIndex + 2;
    } else if (rowIndex === 2) {
      row = rowIndex + 5;
    } else if (rowIndex >= 3) {
      row = rowIndex + 8;
    }
    
    // Adjust the offsets based on the Column
    column = cellIndex + (cellIndex + 2);

    question = data[row][column];

    // Determine if the question is a 200-point (boolean) question by checking the points
    const price = data[row][0];  // Assuming the price (points) is in the first column
    const isBoolean = price === 200;  // Set this to true if the price is 200

    // Set the selected question and whether it's a boolean question
    setSelectedQuestion({ question, rowIndex, cellIndex });
    setIsBooleanQuestion(isBoolean);
  };

  const handleClosePopup = () => {
    setSelectedQuestion(null);
    setIsBooleanQuestion(false);  // Reset the boolean question state when closing
  };

  const handleCorrect = () => {
    setSelectedQuestions([
      ...selectedQuestions,
      { ...selectedQuestion, isCorrect: true } // Marca como correcta
    ]);
    handleClosePopup();
  };
  
  const handleWrong = () => {
    setSelectedQuestions([
      ...selectedQuestions,
      { ...selectedQuestion, isCorrect: false } // Marca como incorrecta
    ]);
    handleClosePopup();
  };

  const handleSelectColumn = (columnIndex) => {
    setSelectedColumn(columnIndex);
  };

  return (
    <div>
      {!data && <UploadScreen onFileUpload={handleFileUpload} />}
      {data && (
        <>
          <RouletteLights
            categories={data[1]
              .filter((_, index) => ![1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21].includes(index)) 
              .slice(0, 10)
            }
            onSelectColumn={handleSelectColumn}
          />
          <GameTable
            data={data}
            onSelect={handleSelectQuestion}
            selectedQuestions={selectedQuestions}
            selectedColumn={selectedColumn}
          />
        </>
      )}
      {selectedQuestion && (
        <QuestionPopup
          question={selectedQuestion.question}
          isBooleanQuestion={isBooleanQuestion}  // Pass whether it's a boolean question
          onClose={handleClosePopup}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
    </div>
  );
};

export default App;
