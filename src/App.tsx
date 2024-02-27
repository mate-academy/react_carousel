import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const DEFAULT_STEP = 3;
const DEFAULT_FRAME_SIZE = 3;
const DEFAULT_ITEM_WIDTH = 130;
const DEFAULT_ANIMATION_DURATION = 1000;

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
  const [step, setStep] = useState(DEFAULT_STEP);
  const [frameSize, setFrameSize] = useState(DEFAULT_FRAME_SIZE);
  const [itemWidth, setItemWidth] = useState(DEFAULT_ITEM_WIDTH);
  const [animationDuration, setAnimationDuration] = useState(
    DEFAULT_ANIMATION_DURATION,
  );
  const [currentImg, setCurrentImg] = useState(0);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className='title'>Carousel with {images.length} images</h1>
      <div className="app__filds">
        <label htmlFor="itemId">
          {'Item width: '}
          <input
            className="input"
            type="number"
            id="itemId"
            min={70}
            max={260}
            step={10}
            value={itemWidth}
            onChange={event => {
              setItemWidth(+event.target.value);
            }}
          />
        </label>

        <label htmlFor="frameId">
          {'Frame size: '}
          <input
            className="input"
            type="number"
            id="frameId"
            min={1}
            step={1}
            max={images.length}
            value={frameSize}
            onChange={event => {
              setFrameSize(+event.target.value);
            }}
          />
        </label>

        <label htmlFor="stepId">
          Step :
          <input
            className="input"
            type="number"
            id="stepId"
            min={1}
            max={frameSize}
            value={step}
            onChange={event => {
              setStep(+event.target.value);
            }}
          />
        </label>

        <label htmlFor="durationId">
          {'Animation duration: '}
          <input
            className="input"
            type="number"
            id="durationId"
            min={0}
            max={5000}
            step={500}
            value={animationDuration}
            onChange={event => {
              setAnimationDuration(+event.target.value);
            }}
          />
        </label>

        <label htmlFor="infinityId">
          {'Infinity: '}
          <input
            type="checkbox"
            id="infinityId"
            onChange={() => setInfinite(!infinite)}
          />
        </label>
      </div>
        <Carousel
        images={images}
        currentImg={currentImg}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
        setCurrentImg={setCurrentImg}
      />
    </div>
  );
};

export default App;
