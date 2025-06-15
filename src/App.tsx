import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carosel/Carousel';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

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
      <h1 className="App__h1" data-cy="title">
        Customizable Carousel
      </h1>
      <form
        className="App__form"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <label htmlFor="itemId">
          Item Width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label htmlFor="animationDurationId">
          Animation Duration (ms):
          <input
            id="animationDurationId"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
