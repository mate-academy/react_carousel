import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './interfaces/State';
import {
  DEFAULT_ITEM_WIDTH,
  DEFAULT_FRAME_SIZE,
  DEFAULT_STEP,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_INFINITE,
} from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<State>({
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
    itemWidth: DEFAULT_ITEM_WIDTH,
    frameSize: DEFAULT_FRAME_SIZE,
    step: DEFAULT_STEP,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    infinite: DEFAULT_INFINITE,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value, type, checked } = event.target;

    // Перетворюємо значення на числа перед збереженням
    const numericValue = type === 'checkbox' ? checked : parseInt(value, 10);

    setState(prevState => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const { images, itemWidth, frameSize, step, animationDuration, infinite } =
    state;

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <form className="App__form">
        <label htmlFor="itemWidth">Item Width, px</label>
        <input
          id="itemWidth"
          type="number"
          className="App__field"
          name="itemWidth"
          value={itemWidth}
          onChange={handleInputChange}
          min={130}
          step={10}
        />
        <label htmlFor="frameSize">Frame Size</label>
        <input
          id="frameSize"
          type="number"
          className="App__field"
          name="frameSize"
          value={frameSize}
          onChange={handleInputChange}
          min={2}
        />
        <label htmlFor="step">Step</label>
        <input
          id="step"
          type="number"
          className="App__field"
          name="step"
          value={step}
          onChange={handleInputChange}
          min={1}
        />
        <label htmlFor="animationDuration">Animation Duration, ms</label>
        <input
          id="animationDuration"
          type="number"
          className="App__field"
          name="animationDuration"
          value={animationDuration}
          onChange={handleInputChange}
          min={100}
          step={100}
        />
        <label>
          Infinite
          <input
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={handleInputChange}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
