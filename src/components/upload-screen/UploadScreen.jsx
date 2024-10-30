import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './UploadScreen.css';

const UploadScreen = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // This function will handle the file upload and parsing
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage('');  // Clear any previous error message when a new file is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Check if the data is parsed correctly
        console.log(parsedData);

        // Now send parsed data to the parent component (App.js)
        onFileUpload(parsedData);
      };
      reader.onerror = function (error) {
        setErrorMessage('Error reading file');
        console.error(error);
      };
      reader.readAsArrayBuffer(file);  // Ensure reading as an array buffer
    } else {
      setErrorMessage('No file selected');
    }
  };

  const handleButtonClick = () => {
    const form = document.getElementById('upload-form');
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <div className="upload-screen">
      <h1 id='upload-title'>Welcome to Jeopardy!</h1>
      <h1 id='upload-title'>Upload your Excel File to Start</h1>
      <div className='events-container'>
        <form id="upload-form" onSubmit={handleSubmit}>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        </form>
        <button 
          type="button" 
          onClick={handleButtonClick} 
          disabled={!file}  // Disable button if no file is selected
        >
          Start
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <p>Don't have the template? <a href="https://docs.google.com/spreadsheets/d/19P4CwiDr9u4YJqldjNhnQWUZ8qDaAJGY/export?format=xlsx" download="Jeopardy_Template.xlsx">Download the template here</a></p>
    </div>
  );
};

export default UploadScreen;
