import React, { useState } from 'react';
import Carousel from './components/Carousel';
import { images } from './constants';

import './App.scss';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const state: State = {
    images,
  };

  const [input, setInput] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;
    const newValue = type === 'checkbox' ? checked : +value;

    setInput((prev) => {
      return { ...prev, [name]: newValue };
    });
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
        <h1 data-cy="title" className='App_title'>Carousel with {images.length} images</h1>

      <Carousel
        images={state.images}
        step={input.step}
        frameSize={input.frameSize}
        itemWidth={input.itemWidth}
        animationDuration={input.animationDuration}
        infinite={input.infinite}
      />

      <div className="App_inputs">
        <label htmlFor="itemWidth">
          Item Width:
          <input
            type="number"
            id="itemWidth"
            name="itemWidth"
            value={input.itemWidth}
            min={130}
            max={260}
            step={5}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="frameSize">
          Frame Size:
          <input
            type="number"
            id="frameSize"
            name="frameSize"
            value={input.frameSize}
            min={1}
            max={state.images.length}
            step={1}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="step">
          Step:
          <input
            type="number"
            id="step"
            name="step"
            value={input.step}
            min={1}
            max={state.images.length}
            step={1}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="animationDuration">
          Animation Duration:
          <input
            type="number"
            id="animationDuration"
            name="animationDuration"
            value={input.animationDuration}
            min={500}
            max={3000}
            step={500}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="infinite">
          Infinite:
          <input
            id="infinite"
            name="infinite"
            type="checkbox"
            checked={input.infinite}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
