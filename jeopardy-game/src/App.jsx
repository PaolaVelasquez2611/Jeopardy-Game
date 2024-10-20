import React, { useState } from 'react';
import UploadScreen from './components/upload-screen/UploadScreen';
import GameTable from './components/game-table/GameTable';
import QuestionPopup from './components/question-pop-up/QuestionPopup';
import RouletteLights from './components/roulette-lights/RouletteLights';  // Importamos el nuevo componente

const App = () => {
  const [data, setData] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);  // Columna seleccionada por la ruleta

  const handleFileUpload = (parsedData) => {
    setData(parsedData);
  };

  const handleSelectQuestion = (rowIndex, cellIndex) => {
    let question;
    var row, column;
  
    // Adjust the offsets based on the rowIndex
    if (rowIndex === 0 || rowIndex === 1) {
      row=rowIndex+2;
    } else if (rowIndex === 2) {
      row=rowIndex+5;
    } else if (rowIndex >= 3) {
      row=rowIndex+8;
    }
    // Adjust the offsets based on the Column
    column=cellIndex+(cellIndex+2);

    question = data[row][column]; 
  
    // Set the selected question state
    setSelectedQuestion({ question, rowIndex, cellIndex });
  };

  const handleClosePopup = () => {
    setSelectedQuestion(null);
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
          {/* Asegúrate de tomar solo las categorías necesarias */}
          <RouletteLights
            categories={data[1] // Extract the correct categories
              .filter((_, index) => ![1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21].includes(index)) // Filter only the correct columns
              .slice(0, 10) // Limit to 10 categories
            }
            onSelectColumn={handleSelectColumn}  // Pasar la función para manejar la columna seleccionada
          />
          <GameTable
            data={data}
            onSelect={handleSelectQuestion}
            selectedQuestions={selectedQuestions}
            selectedColumn={selectedColumn}  // Pasar la columna seleccionada a la tabla
          />
        </>
      )}
      {selectedQuestion && (
        <QuestionPopup
          question={selectedQuestion.question}
          onClose={handleClosePopup}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
    </div>
  );
};

export default App;
