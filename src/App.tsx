import React, { useEffect, useState } from 'react';
import './App.scss';

import Carousel from './components/Carousel/Carousel';
import Settings from './components/Settings/Settings';

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

const imageCount = images.length;

const calculateDefaultItemWidth = (): number => {
  let defaultItemWidth = 130;

  if (window.innerWidth < 500) {
    defaultItemWidth = 60;
  } else if (window.innerWidth < 690) {
    defaultItemWidth = 100;
  }

  return defaultItemWidth;
};

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(calculateDefaultItemWidth);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [position, setPosition] = useState(0);
  const [isPrevButtontnActive, setIsPrevButtontnActive] = useState(false);
  const [isNextButtonActive, setIsNextButtonActive] = useState(true);

  const maxCarouselWidth = frameSize * itemWidth;
  const actualImageWidth = maxCarouselWidth / frameSize;

  const FIRST_POSITION = 0;
  const LAST_POSITION = imageCount - frameSize;

  const handlePrevButtonClick = () => {
    setPosition(currentPosition => (position - step >= FIRST_POSITION
      ? currentPosition - step
      : FIRST_POSITION));
  };

  const handleNextButtonClick = () => {
    setPosition(currentPosition => (position + step <= LAST_POSITION
      ? currentPosition + step
      : LAST_POSITION));
  };

  useEffect(() => {
    setIsPrevButtontnActive(position > FIRST_POSITION);
    setIsNextButtonActive(position < LAST_POSITION);
  }, [position]);

  return (
    <div className="App">
      <h1
        data-cy="title"
        className="App__title"
      >
        Carousel with
        {imageCount}
        images
      </h1>

      <Settings
        itemWidth={itemWidth}
        setItemWidth={setItemWidth}
        imageCount={imageCount}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        setFrameSize={setFrameSize}
        setStep={setStep}
        setAnimationDuration={setAnimationDuration}
      />

      <Carousel
        images={images}
        position={position}
        animationDuration={animationDuration}
        frameSize={frameSize}
        actualImageWidth={actualImageWidth}
        isPrevButtonActive={isPrevButtontnActive}
        isNextButtonActive={isNextButtonActive}
        hadlePrevButtonClick={handlePrevButtonClick}
        hadleNextButtonClick={handleNextButtonClick}
      />
    </div>
  );
};

export default App;
