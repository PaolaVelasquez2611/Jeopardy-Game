import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './UploadScreen.css';  // Import corresponding CSS file

const UploadScreen = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // This function will handle the file upload and parsing
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

  return (
    <div className="upload-screen">
      <h1>Upload Excel File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UploadScreen;
