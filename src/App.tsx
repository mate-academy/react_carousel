import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const imagesArray = {
  images: [
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
  ],
};

const App: React.FC = () => {
  const { images } = imagesArray;
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <form className="App__form form" action="">
        <label htmlFor="itemId">Item Width</label>
        <input
          className="form__input"
          type="number"
          name="itemWidth"
          id="itemId"
          min="1"
          value={itemWidth}
          onChange={e => {
            setItemWidth(+e.target.value);
          }}
        />

        <label htmlFor="frameId">Frame Size</label>
        <input
          className="form__input"
          type="number"
          name="frameSize"
          id="frameId"
          min="1"
          value={frameSize}
          onChange={e => {
            setFrameSize(+e.target.value);
          }}
        />

        <label htmlFor="stepId">Step</label>
        <input
          className="form__input"
          type="number"
          name="step"
          id="stepId"
          min="1"
          value={step}
          onChange={e => {
            setStep(+e.target.value);
          }}
        />

        <label htmlFor="animationDuration">Animation Duration</label>
        <input
          className="form__input"
          type="number"
          name="animationDuration"
          id="animationDuration"
          min="1"
          value={animationDuration}
          onChange={e => {
            setAnimationDuration(+e.target.value);
          }}
        />

        <label htmlFor="infinite">Infinity</label>
        <input
          type="checkbox"
          name="infinite"
          id="infinite"
          checked={infinite}
          onChange={e => {
            setInfinite(e.target.checked);
          }}
        />
      </form>
      <div className="App__Carousel">
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    </div>
  );
};

export default App;
