import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { images } from './images';

const initialOptionsState = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

export const App = () => {
  const [options, setOptions] = useState(initialOptionsState);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = event.target;

    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const {
    step, frameSize, itemWidth, animationDuration, infinite,
  } = options;

  return (
    <div className="App">
      <h1
        className="App__title"
        data-cy="title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <div className="App__labels">
        <label>
          Step:
          <input
            name="step"
            type="number"
            min={3}
            max={10}
            value={step}
            onChange={handleOptionChange}
          />
        </label>

        <label>
          Frame size:
          <input
            name="frameSize"
            type="number"
            min={3}
            max={10}
            value={frameSize}
            onChange={handleOptionChange}
          />
        </label>

        <label>
          Item width:
          <input
            name="itemWidth"
            type="number"
            min={130}
            step={10}
            max={200}
            value={itemWidth}
            onChange={handleOptionChange}
          />
        </label>

        <label>
          Animation duration:
          <input
            name="animationDuration"
            type="number"
            min={1000}
            max={5000}
            step={1000}
            value={animationDuration}
            onChange={handleOptionChange}
          />
        </label>

        <label className="infinite">
          Infinite:
          <input
            name="infinite"
            type="checkbox"
            checked={infinite}
            onChange={handleOptionChange}
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
      />
    </div>
  );
};
