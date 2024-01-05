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

  const handleOptionChange = (key: string, value: number | boolean) => {
    setOptions(prevOptions => ({ ...prevOptions, [key]: value }));
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
            type="number"
            min={1}
            max={10}
            value={step}
            onChange={(e) => handleOptionChange('step', +e.target.value)}
          />
        </label>

        <label>
          Frame size:
          <input
            type="number"
            min={1}
            max={10}
            value={frameSize}
            onChange={(e) => handleOptionChange(
              'frameSize', +e.target.value,
            )}
          />
        </label>

        <label>
          Item width:
          <input
            type="number"
            min={130}
            step={10}
            max={200}
            value={itemWidth}
            onChange={(e) => handleOptionChange(
              'itemWidth', +e.target.value,
            )}
          />
        </label>

        <label>
          Animation duration:
          <input
            type="number"
            min={1000}
            max={5000}
            step={1000}
            value={animationDuration}
            onChange={(e) => handleOptionChange(
              'animationDuration', +e.target.value,
            )}
          />
        </label>

        <label className="infinite">
          Infinite:
          <input
            type="checkbox"
            checked={infinite}
            onChange={(e) => handleOptionChange(
              'infinite', e.target.checked,
            )}
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
