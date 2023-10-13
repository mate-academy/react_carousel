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

const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
      <div className="App__settings">
        <label htmlFor="itemId" className="App__label">
          {'Item Width: '}
          <input
            className="input"
            type="number"
            id="itemId"
            value={itemWidth}
            min={70}
            max={260}
            step={5}
            onChange={(event) => {
              setItemWidth(Number(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="frameId" className="App__label">
          {'Frame Size: '}
          <input
            className="input"
            type="number"
            id="frameId"
            value={frameSize}
            min={1}
            max={images.length}
            step={1}
            onChange={(event) => {
              setFrameSize(Number(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label htmlFor="stepId" className="App__label">
          {'Step: '}
          <input
            className="input"
            type="number"
            id="stepId"
            value={step}
            min={1}
            max={frameSize}
            onChange={(event) => {
              setStep(Number(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label
          htmlFor="animationDurationId"
          className="App__label"
        >
          {'Animation duration: '}
          <input
            className="input"
            type="number"
            id="animationDurationId"
            value={animationDuration}
            min={0}
            max={5000}
            step={500}
            onChange={(event) => {
              setAnimationDuration(Number(event.target.value));
              setCurrentImage(0);
            }}
          />
        </label>

        <label
          htmlFor="infiniteId"
          className="App__label"
        >
          Infinite :
          <input
            className="apple-switch"
            type="checkbox"
            id="infiniteId"
            onChange={() => setInfinite(!infinite)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        currentImage={currentImage}
        setCurrentImage={(v) => setCurrentImage(v)}
      />
    </div>
  );
};

export default App;
