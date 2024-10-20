import React, { useState } from 'react';
import './RouletteLights.css';  // Import the styles

const RouletteLights = ({ categories, onSelectColumn }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const startRoulette = () => {
    setIsSpinning(true);
    setActiveIndex(0);
    let intervalCount = 0;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length); // Use the length of filtered categories

      intervalCount++;
      if (intervalCount > categories.length * 5) {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * categories.length); // Select from the 10 categories
        setActiveIndex(randomIndex);
        setIsSpinning(false);
        onSelectColumn(randomIndex); // Notify GameTable of the selected column
      }
    }, 150); // Speed of the roulette
  };

  return (
    <div className="roulette-lights">
      <div className="lights-row">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`light ${index === activeIndex ? 'active' : ''}`} // Highlight active light
          >
            {category}
          </div>
        ))}
      </div>
      <button onClick={startRoulette} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'Play'}
      </button>
    </div>
  );
};

export default RouletteLights;
