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
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);  // To track multiple-choice questions
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  const handleFileUpload = (parsedData) => {
    setData(parsedData);
  };

  const handleSelectQuestion = (rowIndex, cellIndex) => {
    let question;
    let correctAnswer = null;
    let row, column;

    // Calculate the appropriate row index for the question text
    if (rowIndex === 0 || rowIndex === 1) {
        row = rowIndex + 2;
    } else if (rowIndex === 2) {
        row = rowIndex + 5;
    } else if (rowIndex >= 3) {
        row = rowIndex + 8;
    }

    // Calculate the column for the question
    column = cellIndex + (cellIndex + 2);
    question = data[row][column];

    const price = data[row][0];

    // Boolean question handling (Price 200) here
    if (price === "$200") {
        const booleanColumns = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
        const correctAnswerColumn = booleanColumns[cellIndex];
        correctAnswer = data[2][correctAnswerColumn];
        setIsBooleanQuestion(true);
        setIsMultipleChoice(false);
    }
    // Multiple-choice question handling (Price 400 or 600) here
    else if (price === "$400" || price === "$600") {
        const multipleChoiceColumnsAnswers = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
        const correctAnswerColumn = multipleChoiceColumnsAnswers[cellIndex];
        const correctAnswerRow = price === "$400" ? 3 : 7;  // Row 4 for 400-category, row 8 for 600-category
        correctAnswer = data[correctAnswerRow][correctAnswerColumn];

        // Extract the multiple-choice options (A, B, C) here
        const optionsStartRow = price === "$400" ? 4 : 8;
        const options = [
            data[optionsStartRow][column],     // Option A
            data[optionsStartRow + 1][column], // Option B
            data[optionsStartRow + 2][column], // Option C
        ];

        setMultipleChoiceOptions(options);
        setIsMultipleChoice(true);
        setIsBooleanQuestion(false);
    }
    // Handling questions for price 800 and above (considered single-answer)
    else if (price >= "$800") {
        // Assuming questions above 600 are single-answer, handle accordingly
        correctAnswer = data[row][column]; // Assuming the answer is still in the same column for 800+
        setIsMultipleChoice(false); // Not a multiple-choice question
        setIsBooleanQuestion(false); // Not a boolean question
    }

    setSelectedQuestion({ question, rowIndex, cellIndex });
    setCorrectAnswer(correctAnswer);
    setHasAnswered(false);
    setUserAnswer(null);
};

  const handleClosePopup = () => {
    setSelectedQuestion(null);
    setIsBooleanQuestion(false);
    setIsMultipleChoice(false);
    setCorrectAnswer(null);
    setHasAnswered(false);
    setUserAnswer(null);
  };

  const handleCorrect = (answer) => {
    // Ensure answer is being processed correctly for non-boolean questions
    const isCorrect = answer === 'Correct';  // 'Correct' string is interpreted as true
    setSelectedQuestions([...selectedQuestions, { ...selectedQuestion, isCorrect }]);
    handleClosePopup();
  };

  const handleAnswerBoolean = (userAnswer) => {
    setUserAnswer(userAnswer);  // Store the user's answer
    setHasAnswered(true);  // Mark the question as answered

    // Wait for 2 seconds before determining if the answer was correct
    setTimeout(() => {
      // Compare boolean answers: both correctAnswer and userAnswer are strings 'TRUE' or 'FALSE'
      const wasCorrect = correctAnswer === userAnswer;  // This was working before, keep it simple
      setSelectedQuestions([...selectedQuestions, { ...selectedQuestion, isCorrect: wasCorrect }]);
      handleClosePopup();
    }, 2000);
  };

  const handleAnswerMultipleChoice = (userAnswer) => {
    setUserAnswer(userAnswer);
    setHasAnswered(true);

    setTimeout(() => {
      const wasCorrect = correctAnswer === userAnswer;
      setSelectedQuestions([...selectedQuestions, { ...selectedQuestion, isCorrect: wasCorrect }]);
      handleClosePopup();
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
          isMultipleChoice={isMultipleChoice}
          multipleChoiceOptions={multipleChoiceOptions}
          correctAnswer={correctAnswer}
          userAnswer={userAnswer}
          hasAnswered={hasAnswered}
          onClose={handleClosePopup}
          onAnswer={
            isBooleanQuestion ? handleAnswerBoolean :
              isMultipleChoice ? handleAnswerMultipleChoice :
                handleCorrect
          }
        />
      )}
    </div>
  );
};


export default App;
