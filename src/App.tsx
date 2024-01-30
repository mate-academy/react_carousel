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
const initialSettingsState = {
  itemWidth: 130,
  size: 3,
  step: 3,
  duration: 1000,
  infinite: false,
};

const App: React.FC = () => {
  const [settings, setSettings] = useState(initialSettingsState);
  const {
    itemWidth,
    size,
    step,
    duration,
    infinite,
  } = settings;

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
        <label className="input_label">
          Item width:
          <input
            className="input_value"
            type="number"
            min={130}
            max={400}
            step={15}
            value={itemWidth}
            onChange={event => setSettings(prevState => ({
              ...prevState,
              itemWidth: Number(event.target.value),
            }))}
          />
        </label>
        <label className="input_label">
          Frame Size:
          <input
            className="input_value"
            type="number"
            min={1}
            max={10}
            step={1}
            value={size}
            onChange={event => setSettings(prevState => ({
              ...prevState,
              size: Number(event.target.value),
            }))}
          />
        </label>
        <label className="input_label">
          Step:
          <input
            className="input_value"
            type="number"
            min={1}
            max={10}
            step={1}
            value={step}
            onChange={event => setSettings(prevState => ({
              ...prevState,
              step: Number(event.target.value),
            }))}
          />
        </label>
        <label className="input_label">
          Animation Duration:
          <input
            className="input_value"
            type="number"
            min={0}
            step={100}
            value={duration}
            onChange={event => setSettings(prevState => ({
              ...prevState,
              duration: Number(event.target.value),
            }))}
          />
        </label>
        <label
          className="input_label"
        >
          Infinite:
          <input
            className="input_value"
            type="checkbox"
            onChange={() => setSettings(prevState => ({
              ...prevState,
              infinite: !infinite,
            }))}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
