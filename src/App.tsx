import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const DEFAULT_FRAME_SIZE = 3;
const DEFAULT_ITEM_WIDTH = 130;
const STEP = 3;
const DEFAULT_DURATION = 1000;

export const App: React.FC = () => {
  const [frameSize, setFrameSize] = useState(DEFAULT_FRAME_SIZE);
  const [itemWidth, setItemWidth] = useState(DEFAULT_ITEM_WIDTH);
  const [step, setStep] = useState(STEP);
  const [animationDuration, setAnimationDuration] = useState(DEFAULT_DURATION);

  const handleItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setFrameSize(value || DEFAULT_FRAME_SIZE);
  };

  const handleWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setItemWidth(value || DEFAULT_ITEM_WIDTH);
  };

  const handeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setStep(value || STEP);
  };

  const handleDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setAnimationDuration(value || DEFAULT_DURATION);
  };

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

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="Carousel_menu">

        <div className="menu">
          <label htmlFor="itemSize">
            ItemWidth
            <input
              id="itemSize"
              placeholder="itemWidth"
              type="number"
              value={itemWidth}
              min={50}
              max={260}
              onChange={handleWidth}
            />
          </label>

          <label htmlFor="frameId">
            FrameSize
            <input
              id="frameId"
              placeholder="frameSize"
              type="number"
              value={frameSize}
              min={1}
              max={10}
              onChange={handleItems}
            />
          </label>

          <label htmlFor="stepId">
            Step
            <input
              id="stepId"
              placeholder="step"
              type="number"
              value={step}
              min={1}
              max={images.length - 1}
              onChange={handeStep}
            />
          </label>

          <label htmlFor="animationId">
            Animation
            <input
              id="animationId"
              placeholder="animationDuration"
              type="number"
              value={animationDuration}
              min={0}
              onChange={handleDuration}
            />
          </label>
        </div>
      </div>
      <div className="Container">
        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    </div>
  );
};

export default App;
