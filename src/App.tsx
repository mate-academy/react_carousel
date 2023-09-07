import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { images } from './constants';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const state: State = {
    images,
  };
  const [inputs, setInputs] = useState({
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
    const newValue = type === 'checkbox'
      ? checked : +value;

    setInputs((prev) => {
      return { ...prev, [name]: newValue };
    });
  };

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        {`Carousel with ${state.images.length} images`}
      </h1>
      <div className="App__inputs">
        <label>
          Step:
          <input
            type="number"
            name="step"
            value={inputs.step}
            min={1}
            max={10}
            onChange={handleChange}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            name="frameSize"
            value={inputs.frameSize}
            min={1}
            max={state.images.length}
            onChange={handleChange}
          />
        </label>

        <label>
          Item Width:
          <input
            type="number"
            name="itemWidth"
            value={inputs.itemWidth}
            onChange={handleChange}
          />
        </label>

        <label>
          Animation Duration:
          <input
            type="number"
            name="animationDuration"
            min={1000}
            max={3000}
            value={inputs.animationDuration}
            onChange={handleChange}
          />
        </label>

        <label>
          Infinite:
          <input
            type="checkbox"
            name="infinite"
            checked={inputs.infinite}
            onChange={handleChange}
          />
        </label>
      </div>

      <Carousel
        images={state.images}
        step={inputs.step}
        frameSize={inputs.frameSize}
        itemWidth={inputs.itemWidth}
        animationDuration={inputs.animationDuration}
        infinite={inputs.infinite}
      />
    </div>
  );
};

export default App;
