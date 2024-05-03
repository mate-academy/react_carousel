import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

export const App: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
      <fieldset className="App__settings">
        <legend>Settings</legend>
        <label htmlFor="itemId" className="App__label">
          {'Item width: '}
          <input
            type="number"
            id="itemId"
            min={30}
            max={300}
            step={10}
            onChange={(event) => {
              setItemWidth(+event.target.value);
              setCurrentImage(0);
            }}
            value={itemWidth}
          />
        </label>

        <label htmlFor="frameId" className="App__label">
          {'Frame size: '}
          <input
            type="number"
            id="frameId"
            min={1}
            max={images.length}
            step={1}
            onChange={(event) => {
              setFrameSize(+event.target.value);
              setCurrentImage(0);
            }}
            value={frameSize}
          />
        </label>

        <label htmlFor="stepId" className="App__label">
          {'Step: '}
          <input
            type="number"
            id="stepId"
            min={3}
            max={images.length}
            step={1}
            onChange={(event) => {
              setStep(+event.target.value);
              setCurrentImage(0);
            }}
            value={step}
          />
        </label>
        <label htmlFor="animationId" className="App__label">
          {'Animation duration: '}
          <input
            type="number"
            id="animationId"
            min="100"
            max="5000"
            step={100}
            onChange={(event) => {
              setAnimationDuration(+event.target.value);
              setCurrentImage(0);
            }}
            value={animationDuration}
          />
        </label>

        <label htmlFor="infinite" className="App__label">
          {'Infinite: '}
          <input
            type="checkbox"
            onChange={() => setInfinite(!infinite)}
            checked={infinite}
          />
        </label>
      </fieldset>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        currentImageIndex={currentImage}
        setCurrentImageIndex={setCurrentImage}
      />
    </div>
  );
};

export default App;
