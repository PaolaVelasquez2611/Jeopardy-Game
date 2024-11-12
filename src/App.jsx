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
  const [answeredColumns, setAnsweredColumns] = useState([]); 
  const [columnAnswers, setColumnAnswers] = useState({});// Track answered columns
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isBooleanQuestion, setIsBooleanQuestion] = useState(false);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
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
      row = rowIndex + 6;
    } else if (rowIndex >= 3) {
      row = rowIndex + 10;
    }

    const price = data[row][0];

    // Calculate the column for the question
    if(price === "$200" || price === "$400" || price === "$600"){
      column = cellIndex + (cellIndex + (3+cellIndex));
    }
    else{
      column = cellIndex+(cellIndex+(cellIndex+2));      
    }
  
    question = data[row][column];

    // Boolean question handling (Price 200) here
    if (price === "$200") {
      const booleanColumns = [4, 7, 10, 13, 16, 19, 22, 25, 28, 31];
      const correctAnswerColumn = booleanColumns[cellIndex];
      correctAnswer = data[2][correctAnswerColumn];
      // Ensure the value is either "TRUE" or "FALSE" and in uppercase
      try {
        // Try to convert correctAnswer to a string and make it uppercase
        correctAnswer = correctAnswer.toString().toUpperCase();
      } catch (error) {
        if (error instanceof TypeError) {
          // Handle the TypeError if correctAnswer is not a valid type for toString()
          console.error("TypeError: Unable to convert correctAnswer to string and uppercase:", error);
          // Optionally, assign a default value here
          correctAnswer = "NOT CHOSEN IN EXCEL TEMPLATE"; // or "TRUE", based on your logic
        } else {
          // Handle any other type of errors that may occur
          console.error("An unexpected error occurred:", error);
        }
      }

      if (correctAnswer !== "TRUE" && correctAnswer !== "FALSE") {
        // Handle the case where the value is not "TRUE" or "FALSE"
        console.error("Invalid value for correctAnswer:", correctAnswer);
        // Optionally, you could assign a default value here
        correctAnswer = "NOT CHOSEN IN EXCEL TEMPLATE"; // or "TRUE" based on your logic
      }
      console.log("true_false_answer", correctAnswer);
      setIsBooleanQuestion(true);
      setIsMultipleChoice(false);
    }
    // Multiple-choice question handling (Price 400 or 600) here
    else if (price === "$400" || price === "$600") {
      const multipleChoiceColumnsAnswers = [4, 7, 10, 13, 16, 19, 22, 25, 28, 31];
      const correctAnswerColumn = multipleChoiceColumnsAnswers[cellIndex];
      const correctAnswerRow = price === "$400" ? 3 : 8;  // Row 4 for 400-category, row 8 for 600-category
      correctAnswer = data[correctAnswerRow][correctAnswerColumn];
      // Ensure the value is either "A,B,C,D" and in uppercase
      try {
        // Try to convert correctAnswer to a string and make it uppercase
        correctAnswer = correctAnswer.toString().toUpperCase();
      } catch (error) {
        if (error instanceof TypeError) {
          // Handle the TypeError if correctAnswer is not a valid type for toString()
          console.error("TypeError: Unable to convert correctAnswer to string and uppercase:", error);
          // Optionally, assign a default value here
          correctAnswer = "NOT CHOSEN IN EXCEL TEMPLATE"; // or "TRUE", based on your logic
        } else {
          // Handle any other type of errors that may occur
          console.error("An unexpected error occurred:", error);
        }
      }

      if (correctAnswer !== "A" && correctAnswer !== "B" && correctAnswer !== "C" && correctAnswer !== "D") {
        // Handle the case where the value is not "TRUE" or "FALSE"
        console.error("Invalid value for correctAnswer:", correctAnswer);
        // Optionally, you could assign a default value here
        correctAnswer = "NOT CHOSEN IN EXCEL TEMPLATE"; // or "TRUE" based on your logic
      }
      console.log("choice_answer", correctAnswer);
      // Extract the multiple-choice options (A, B, C, D) here
      const optionsStartRow = price === "$400" ? 4 : 9;
      const options = [
        data[optionsStartRow][column],     // Option A
        data[optionsStartRow + 1][column], // Option B
        data[optionsStartRow + 2][column], // Option C
        data[optionsStartRow + 3][column], // Option D
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

    const categoryColumns = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
    const selectedCategory = data[1][categoryColumns[cellIndex]];
    setSelectedCategory(selectedCategory);
  };

  const handleClosePopup = () => {
    setSelectedQuestion(null);
    setIsBooleanQuestion(false);
    setIsMultipleChoice(false);
    setCorrectAnswer(null);
    setHasAnswered(false);
    setUserAnswer(null);

    if (selectedColumn !== null) {
      // Update the answered questions for the column
      const updatedColumnAnswers = { ...columnAnswers };
      updatedColumnAnswers[selectedColumn] = (updatedColumnAnswers[selectedColumn] || 0) + 1;

      setColumnAnswers(updatedColumnAnswers);

      // Mark column as completed if all 9 questions are answered
      if (updatedColumnAnswers[selectedColumn] === 9 && !answeredColumns.includes(selectedColumn)) {
        setAnsweredColumns([...answeredColumns, selectedColumn]);
      }
    }
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

    // Wait for X seconds before determining if the answer was correct
    setTimeout(() => {
      // Compare boolean answers: both correctAnswer and userAnswer are strings 'TRUE' or 'FALSE'
      const wasCorrect = correctAnswer === userAnswer;  // This was working before, keep it simple
      setSelectedQuestions([...selectedQuestions, { ...selectedQuestion, isCorrect: wasCorrect }]);
      handleClosePopup();
    }, 5000);
  };

  const handleAnswerMultipleChoice = (userAnswer) => {
    setUserAnswer(userAnswer);
    setHasAnswered(true);

    setTimeout(() => {
      const wasCorrect = correctAnswer === userAnswer;
      setSelectedQuestions([...selectedQuestions, { ...selectedQuestion, isCorrect: wasCorrect }]);
      handleClosePopup();
    }, 5000);
  };

  const handleSelectColumn = (columnIndex) => {
    setSelectedColumn(columnIndex); // Use the provided columnIndex if needed elsewhere
  };

  return (
    <div>
      {!data && <UploadScreen onFileUpload={handleFileUpload} />}
      {data && (
        <>
          <RouletteLights
            categories={data[1]
              .filter((_, index) => ![1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31].includes(index))
              .slice(0, 10)
            }
            answeredColumns={answeredColumns}  // Pass answered columns
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
          category={selectedCategory}
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
