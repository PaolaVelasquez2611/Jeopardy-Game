import React, { useState } from 'react';
import UploadScreen from './components/upload-screen/UploadScreen';
import GameTable from './components/game-table/GameTable';
import QuestionPopup from './components/question-pop-up/QuestionPopup';
import RouletteLights from './components/roulette-lights/RouletteLights';

const App = () => {
  const [data, setData] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isBooleanQuestion, setIsBooleanQuestion] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);  // Track the user's answer

  const handleFileUpload = (parsedData) => {
    setData(parsedData);
  };

  const handleSelectQuestion = (rowIndex, cellIndex) => {
    let question;
    let correctAnswer = null;
    let row, column;

    if (rowIndex === 0 || rowIndex === 1) {
      row = rowIndex + 2;
    } else if (rowIndex === 2) {
      row = rowIndex + 5;
    } else if (rowIndex >= 3) {
      row = rowIndex + 8;
    }

    column = cellIndex + (cellIndex + 2);
    question = data[row][column];

    const price = data[row][0];
    const isBoolean = price === 200;

    if (isBoolean) {
      const booleanColumns = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
      const correctAnswerColumn = booleanColumns[cellIndex];
      correctAnswer = data[2][correctAnswerColumn];
    }

    setSelectedQuestion({ question, rowIndex, cellIndex });
    setIsBooleanQuestion(isBoolean);
    setCorrectAnswer(correctAnswer);
    setHasAnswered(false);
    setUserAnswer(null);  // Reset user's answer
  };

  const handleClosePopup = () => {
    setSelectedQuestion(null);
    setIsBooleanQuestion(false);
    setCorrectAnswer(null);
    setHasAnswered(false);
    setUserAnswer(null);  // Reset user's answer when closing
  };

  const handleCorrect = (isCorrect) => {
    setSelectedQuestions([...selectedQuestions, { ...selectedQuestion, isCorrect }]);
    handleClosePopup();
  };

  const handleAnswerBoolean = (userAnswer) => {
    setUserAnswer(userAnswer);  // Store the user's answer
    setHasAnswered(true);  // Mark the question as answered

    // Wait for 2 seconds before determining if the answer was correct
    setTimeout(() => {
      const wasCorrect = correctAnswer === userAnswer;  // Compare user's answer with correct answer
      handleCorrect(wasCorrect);  // Pass the boolean result
    }, 2000);
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
          isBooleanQuestion={isBooleanQuestion}
          correctAnswer={correctAnswer}
          userAnswer={userAnswer}  // Pass userAnswer to QuestionPopup
          hasAnswered={hasAnswered}
          onClose={handleClosePopup}
          onAnswer={handleAnswerBoolean}
        />
      )}
    </div>
  );
};

export default App;
