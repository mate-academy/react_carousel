import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [images] = useState([
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
  ]);

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="Form">
        <label htmlFor="itemId">
          Item width:{' '}
          <input
            id="itemId"
            value={itemWidth}
            name="itemWidth"
            type="number"
            onChange={event => setItemWidth(+event.target.value)}
          ></input>
        </label>
        <label htmlFor="frameId">
          Frame size:{' '}
          <input
            id="frameId"
            value={frameSize}
            name="frameSize"
            type="number"
            onChange={event => setFrameSize(+event.target.value)}
          ></input>
        </label>
        <label htmlFor="stepId">
          Step:{' '}
          <input
            id="stepId"
            value={step}
            name="step"
            type="number"
            onChange={event => setStep(+event.target.value)}
          ></input>
        </label>
        <label htmlFor="animationDuration">
          Animation duration:{' '}
          <input
            id="animationDuration"
            value={animationDuration}
            name="animationDuration"
            type="number"
            onChange={event => setAnimationDuration(+event.target.value)}
          ></input>
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        step={step}
        frameSize={frameSize}
        animationDuration={animationDuration}
        infinite={true}
      />
    </div>
  );
};

export default App;
