import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const DEFAULT_STEPS_COUNT = 3;
const DEFAULT_FRAME_SIZE = 3;
const DEFAULT_ITEM_WIDTH = 130;
const DEFAULT_ANIMATION = 1000;

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
  const [stepsCount, setStepsCount] = useState(DEFAULT_STEPS_COUNT);
  const [frameSize, setFrameSize] = useState(DEFAULT_FRAME_SIZE);
  const [itemWidth, setItemWidth] = useState(DEFAULT_ITEM_WIDTH);
  const [animationDuration, setAnimationDuration] = useState(DEFAULT_ANIMATION);
  const [isInfinite, setIsInfinite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="app">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
      <div className="app__fields">
        <label htmlFor="itemId">
          {'Item Width: '}
          <input
            className="input"
            type="number"
            id="itemId"
            min={70}
            max={260}
            step={10}
            value={itemWidth}
            onChange={(event) => {
              setItemWidth(+(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="frameId">
          {'Frame Size: '}
          <input
            className="input"
            type="number"
            id="frameId"
            min={1}
            max={images.length}
            step={1}
            value={frameSize}
            onChange={(event) => {
              setFrameSize(+(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="stepId">
          {'Step: '}
          <input
            className="input"
            type="number"
            id="stepId"
            min={1}
            max={frameSize}
            value={stepsCount}
            onChange={(event) => {
              setStepsCount(+(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label
          htmlFor="animationId"
        >
          {'Animation duration: '}
          <input
            className="input"
            type="number"
            id="animationId"
            min={0}
            max={3000}
            step={500}
            value={animationDuration}
            onChange={(event) => {
              setAnimationDuration(+(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label
          htmlFor="infinite"
        >
          Infinite:
          <input
            type="checkbox"
            id="infinite"
            onChange={() => setIsInfinite(!isInfinite)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={stepsCount}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={isInfinite}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
};

export default App;
