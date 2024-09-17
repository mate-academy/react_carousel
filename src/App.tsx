import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const App: React.FC = () => {
  // Używamy useState do przechowywania listy obrazów
  const [images] = useState([
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/7.png',
    './img/8.png',
    './img/9.png',
    './img/10.png',
  ]);

  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);

  const handleSetStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(Math.round(Number(event.target.value)));
  };

  const handleSetItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWidth(Math.round(Number(event.target.value)));
  };

  return (
    <div className="App">
      <h1>Carousel with {images.length} images</h1>
      <label htmlFor="stepInput">Set step: </label>
      <input type="number" value={step} onChange={handleSetStep} />

      <label htmlFor="itemWidthInput">Set item width: </label>
      <input
        className="itemWithInput"
        type="number"
        value={itemWidth}
        onChange={handleSetItemWidth}
      />
      {/* Przekazanie images jako props do Carousel */}
      <Carousel
        images={images}
        step={step}
        itemWidth={itemWidth}
        frameSize={3}
        animationDuration={1000}
      />
    </div>
  );
};

export default App;
