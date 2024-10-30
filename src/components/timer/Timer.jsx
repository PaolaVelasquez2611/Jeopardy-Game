import { useState, useEffect } from "react";
import "./Timer.css"; // CSS for styling

const Timer = () => {
  const initialTime = 90; // Set the fixed time to 90 seconds
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    setSeconds(initialTime); // Reset the timer to 90 seconds when the component mounts
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [seconds]);

  // Calculate the percentage of time left to adjust the width of the progress bar
  const percentage = (seconds / initialTime) * 100;

  return (
    <div className="timer">
      <div
        className="progress-background"
        style={{ width: `${percentage}%` }} // Adjust width based on remaining time
      ></div>
      <span className="timer-text">Time left: {seconds > 0 ? seconds : "Time's up!"}</span>
    </div>
  );
};

export default Timer;
