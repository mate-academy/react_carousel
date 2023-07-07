import React, { useState, useEffect } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

const images = [
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
];

const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [isPrevBtnActive, setIsPrevBtnActive] = useState(false);
  const [isNextBtnActive, setIsNextBtnActive] = useState(true);
  const [position, setPosition] = useState(0);

  const handlePrevBtnClick = () => {
    setPosition(currentPosition => (position - step >= 0
      ? currentPosition - step
      : 0));
  };

  const handleNextBtnClick = () => {
    setPosition(currentPosition => (
      position + step <= images.length - frameSize
        ? currentPosition + step
        : images.length - frameSize
    ));
  };

  useEffect(() => {
    setIsPrevBtnActive(position > 0);
    setIsNextBtnActive(position < images.length - frameSize);
  }, [position]);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className="App__title">
        Carousel with
        {' '}
        {images.length}
        {' '}
        images
      </h1>

      <div className="form">
        <div className="form__control">
          <label htmlFor="step">Step: </label>
          <input
            type="number"
            id="step"
            value={step}
            onChange={(e) => setStep(+e.target.value)}
          />
        </div>

        <div className="form__control">
          <label htmlFor="count">Count images: </label>
          <input
            type="number"
            id="count"
            value={frameSize}
            onChange={(e) => setFrameSize(+e.target.value)}
          />
        </div>

        <div className="form__control">
          <label htmlFor="width">Image width: </label>
          <input
            type="number"
            id="width"
            value={itemWidth}
            onChange={(e) => setItemWidth(+e.target.value)}
          />
        </div>

        <div className="form__control">
          <label htmlFor="duration">Duration: </label>
          <input
            type="number"
            id="duration"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(+e.target.value)}
          />
        </div>
      </div>

      <Carousel
        images={images}
        position={position}
        animationDuration={animationDuration}
        frameSize={frameSize}
        itemWidth={itemWidth}
        isPrevBtnActive={isPrevBtnActive}
        handlePrevBtnClick={handlePrevBtnClick}
        isNextBtnActive={isNextBtnActive}
        handleNextBtnClick={handleNextBtnClick}
      />
    </div>
  );
};

export default App;
