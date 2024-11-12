import React, { useState, useRef } from 'react';
import './RouletteLights.css';

const RouletteLights = ({ categories, answeredColumns, onSelectColumn }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const lastSelectedIndex = useRef(null);

  const startRoulette = () => {
    const availableCategories = categories
      .map((category, index) => ({ category, index }))
      .filter(({ index }) => !answeredColumns.includes(index));

    if (availableCategories.length === 0) {
      console.warn("All categories are answered.");
      return;
    }

    setIsSpinning(true);
    let intervalCount = 0;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        let nextIndex = (prevIndex + 1) % categories.length;
        while (answeredColumns.includes(nextIndex)) {
          nextIndex = (nextIndex + 1) % categories.length;
        }
        return nextIndex;
      });

      intervalCount++;
      if (intervalCount > categories.length * 5) {
        clearInterval(interval);

        let randomIndex;
        do {
          randomIndex = availableCategories[Math.floor(Math.random() * availableCategories.length)].index;
        } while (randomIndex === lastSelectedIndex.current && availableCategories.length > 1);

        lastSelectedIndex.current = randomIndex;
        setActiveIndex(randomIndex);
        setIsSpinning(false);
        onSelectColumn(randomIndex);
      }
    }, 150);
  };

  return (
    <div className="roulette-lights">
      <div className="button-container">
        <button className="play-button" onClick={startRoulette} disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Jeopardize!'}
        </button>
      </div>
      <div className="lights-row">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`light ${index === activeIndex ? 'active' : ''} ${answeredColumns.includes(index) ? 'answered' : ''}`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouletteLights;