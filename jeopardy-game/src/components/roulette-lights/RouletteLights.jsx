import React, { useState, useEffect } from 'react';
import './RouletteLights.css';  // Importar el archivo de estilos

const RouletteLights = ({ categories, onSelectColumn }) => {
  const [activeIndex, setActiveIndex] = useState(null);  // Índice de la luz activa
  const [isSpinning, setIsSpinning] = useState(false);

  // Función para iniciar la ruleta
  const startRoulette = () => {
    setIsSpinning(true);
    setActiveIndex(0);  // Empezar en la primera luz
    let intervalCount = 0;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);  // Cambiar la luz activa

      intervalCount++;
      if (intervalCount > categories.length * 5) {  // Detener después de varias vueltas
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * categories.length);  // Seleccionar una columna aleatoria
        setActiveIndex(randomIndex);  // Detener en la columna seleccionada
        setIsSpinning(false);
        onSelectColumn(randomIndex);  // Notificar a la tabla que se seleccionó una columna
      }
    }, 150);  // Velocidad de la ruleta
  };

  return (
    <div className="roulette-lights">
      <div className="lights-row">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`light ${index === activeIndex ? 'active' : ''}`}  // Agregar clase activa si la luz está encendida
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
