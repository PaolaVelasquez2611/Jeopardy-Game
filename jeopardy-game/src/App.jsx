import React, { useState } from 'react';
import UploadScreen from './components/upload-screen/UploadScreen';
import GameTable from './components/game-table/GameTable';
import QuestionPopup from './components/question-pop-up/QuestionPopup';

const App = () => {
  const [data, setData] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleFileUpload = (parsedData) => {
    setData(parsedData);
  };

  const handleSelectQuestion = (rowIndex, cellIndex) => {
    const question = data[rowIndex + 2][cellIndex + 2]; // Get the question from data
    setSelectedQuestion({ question, rowIndex, cellIndex });
  };

  const handleClosePopup = () => {
    setSelectedQuestion(null);
  };

  const handleCorrect = () => {
    setSelectedQuestions([...selectedQuestions, selectedQuestion]);
    handleClosePopup();
  };

  const handleWrong = () => {
    setSelectedQuestions([...selectedQuestions, selectedQuestion]);
    handleClosePopup();
  };

  return (
    <div>
      {!data && <UploadScreen onFileUpload={handleFileUpload} />}
      {data && (
        <GameTable
          data={data}
          onSelect={handleSelectQuestion}
          selectedQuestions={selectedQuestions}
        />
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
