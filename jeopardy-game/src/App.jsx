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
    const question = data[rowIndex + 2][cellIndex + 2]; // Obtener la pregunta de los datos
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
          {/* Asegurémonos de pasar la fila correcta para las categorías */}
          <RouletteLights
            categories={data[1].slice(2)}  // Asegúrate de tomar la segunda fila (row 1), y omitimos las dos primeras columnas
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
