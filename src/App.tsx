import React, {
  useEffect,
  useState,
} from 'react';

import './App.scss';
import { Carousel } from './components/Carousel';
import { Settings } from './components/Settings';

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

const IMAGE_COUNT = images.length;

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(1);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [position, setPosition] = useState(0);
  const [isPrevBtnActive, setIsPrevBtnActive] = useState(false);
  const [isNextBtnActive, setIsNextBtnActive] = useState(true);

  const LAST_POSITON = IMAGE_COUNT - frameSize;
  const FIRST_POSITION = 0;

  const handlePrevBtnClick = () => {
    setPosition(currentPosition => (position - step >= FIRST_POSITION
      ? currentPosition - step
      : FIRST_POSITION));
  };

  const handleNextBtnClick = () => {
    setPosition(currentPosition => (position + step <= LAST_POSITON
      ? currentPosition + step
      : LAST_POSITON));
  };

  useEffect(() => {
    setIsPrevBtnActive(position > FIRST_POSITION);
    setIsNextBtnActive(position < LAST_POSITON);
  }, [position]);

  useEffect(() => {}, [
    itemWidth,
    frameSize,
    step,
    animationDuration,
  ]);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className='App__title' data-cy="title">Carousel with {IMAGE_COUNT} images</h1>

      <Settings
        itemWidth={itemWidth}
        setItemWidth={setItemWidth}
        IMAGE_COUNT={IMAGE_COUNT}
        frameSize={frameSize}
        setFrameSize={setFrameSize}
        step={step}
        setStep={setStep}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
      />

      <div
        className="App__content"
        style={{
          maxWidth: `${IMAGE_COUNT * itemWidth}px`,
        }}
      >
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
    </div>
  );
};
