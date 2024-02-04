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
  const [size, setSize] = useState(130);
  const [offset, setOffset] = useState(0);
  const [displayPicsQnty, setDisplayPicsQnty] = useState(3);
  const [scrollStep, setScrollStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = +e.target.value;
    const currentPosition = offset / size;

    setOffset(currentPosition * newSize);
    setSize(newSize);
  };

  const handlePicsQntyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPicsQty = +e.target.value;
    const containerWidth = images.length * size;
    const newVisibleArea = newPicsQty * size;

    setDisplayPicsQnty(newPicsQty);

    if (offset - newVisibleArea < -containerWidth) {
      setOffset(offset + size);
    }
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title" className="App__title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        width={size}
        offset={offset}
        onOffsetChange={setOffset}
        picCount={displayPicsQnty}
        step={scrollStep}
        animationDuration={animationDuration}
      />

      <fieldset className="App__fieldset">
        <legend>Carousel settings</legend>

        <label className="App__label">
          Picture width:
          <input
            className="App__input"
            type="number"
            min="10"
            step="10"
            value={size}
            onChange={handleSizeChange}
          />
        </label>

        <label className="App__label">
          Frame size:
          <input
            className="App__input"
            type="number"
            min="1"
            step="1"
            max={images.length}
            value={displayPicsQnty}
            onChange={handlePicsQntyChange}
          />
        </label>

        <label className="App__label">
          Step:
          <input
            className="App__input"
            type="number"
            min="1"
            step="1"
            max={images.length}
            value={scrollStep}
            onChange={(e) => setScrollStep(+e.target.value)}
          />
        </label>

        <label className="App__label">
          Animation duration:
          <input
            className="App__input"
            type="number"
            min="0"
            step="100"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(+e.target.value)}
          />
        </label>
      </fieldset>
    </div>
  );
};

export default App;
