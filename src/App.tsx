import React, { useState } from 'react';
import Carousel from './components/Carousel';
import './App.scss';

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

const initialOptions = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

const App: React.FC = () => {
  const [options, setOptions] = useState(initialOptions);
  const { itemWidth, frameSize, step, animationDuration, infinite } = options;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue = name === 'infinite' ? !infinite : +value;

    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: newValue,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="App__form" action="#" method="post">
        <label className="App__label" htmlFor="itemId">
          Item Width:
          <input
            type="number"
            className="App__input"
            id="itemId"
            name="itemWidth"
            min="0"
            step="10"
            value={itemWidth}
            onChange={handleInputChange}
          />
        </label>

        <label className="App__label" htmlFor="frameId">
          Frame Size:
          <input
            type="number"
            className="App__input"
            id="frameId"
            name="frameSize"
            min="1"
            step="1"
            value={frameSize}
            onChange={handleInputChange}
          />
        </label>

        <label className="App__label" htmlFor="stepId">
          Step:
          <input
            type="number"
            className="App__input"
            id="stepId"
            name="step"
            min="1"
            step="1"
            value={step}
            onChange={handleInputChange}
          />
        </label>

        <label className="App__label" htmlFor="animationDurationId">
          Animation Duration:
          <input
            type="number"
            className="App__input"
            id="animationDurationId"
            name="animationDuration"
            min="0"
            step="100"
            value={animationDuration}
            onChange={handleInputChange}
          />
        </label>
        <label className="App__label" htmlFor="infiniteId">
          Infinite:
          <input
            type="checkbox"
            className="App__input"
            id="infiniteId"
            name="infinite"
            checked={infinite}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <Carousel images={images} {...options} />
    </div>
  );
};

export default App;
