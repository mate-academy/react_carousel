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
  const [itemWidth, setItemWidth] = useState(130);
  const [size, setSize] = useState(3);
  const [step, setStep] = useState(3);
  const [duration, setDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <Carousel
        images={images}
        step={step}
        frameSize={size}
        itemWidth={itemWidth}
        animationDuration={duration}
        infinite={infinite}
      />
      <div className="input">
        <label htmlFor="ItemWidth" className="input_label">
          Item width:
          <input
            className="input_value"
            type="number"
            id="ItemWidth"
            min={0}
            max={400}
            step={15}
            value={itemWidth}
            onChange={(event) => setItemWidth(+Number(event.target.value))}
          />
        </label>
        <label htmlFor="FrameSize" className="input_label">
          Frame Size:
          <input
            className="input_value"
            type="number"
            id="FrameSize"
            min={0}
            max={10}
            step={1}
            value={size}
            onChange={(event) => setSize(+Number(event.target.value))}
          />
        </label>
        <label htmlFor="Steps" className="input_label">
          Step:
          <input
            className="input_value"
            type="number"
            id="Steps"
            min={0}
            max={10}
            step={1}
            value={step}
            onChange={(event) => setStep(+Number(event.target.value))}
          />
        </label>
        <label htmlFor="AnimationDuration" className="input_label">
          Animation Duration:
          <input
            className="input_value"
            type="number"
            id="AnimationDuration"
            min={0}
            step={100}
            value={duration}
            onChange={(event) => setDuration(
              +Number(event.target.value),
            )}
          />
        </label>
        <label
          htmlFor="infinite"
          className="input_label"
        >
          Infinite:
          <input
            className="input_value"
            type="checkbox"
            id="infinite"
            onChange={() => setInfinite(!infinite)}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
