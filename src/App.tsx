import { useState } from 'react';

import './App.scss';
import Carousel from './components/Carousel';
import type { Controls } from './types/Controls';

const defaultControls: Controls = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  isInfinite: false,
};

export const App = () => {
  const [controls, setControls] = useState<Controls>(defaultControls);

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

  const handleInputChange = (control: keyof Controls, value: number) => {
    setControls(currentControls => ({ ...currentControls, [control]: value }));
  };

  const toggleInfiniteCheckbox = () => {
    setControls(currentControls => ({
      ...currentControls, isInfinite: !currentControls.isInfinite,
    }));
  };

  return (
    <div className="App">
      <h1 className="App__title">
        {`Carousel with ${images.length} images`}
      </h1>

      <div className="App__controls">
        <label className="App__control">
          Item width:
          <input
            type="number"
            className="App__input"
            value={controls.itemWidth}
            onChange={(event) => {
              handleInputChange('itemWidth', +event.target.value);
            }}
            step={10}
          />
        </label>

        <label className="App__control">
          Frame size:
          <input
            type="number"
            className="App__input"
            value={controls.frameSize}
            min={1}
            max={images.length}
            onChange={(event) => {
              handleInputChange('frameSize', +event.target.value);
            }}
          />
        </label>

        <label className="App__control">
          Step:
          <input
            type="number"
            className="App__input"
            value={controls.step}
            min={1}
            max={images.length}
            onChange={(event) => {
              handleInputChange('step', +event.target.value);
            }}
          />
        </label>

        <label className="App__control">
          Animation duration:
          <input
            type="number"
            className="App__input"
            value={controls.animationDuration}
            min={0}
            step={100}
            onChange={(event) => {
              handleInputChange('animationDuration', +event.target.value);
            }}
          />
        </label>

        <label className="App__control">
          Infinite:
          <input
            type="checkbox"
            className="App__check"
            checked={controls.isInfinite}
            onClick={toggleInfiniteCheckbox}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={controls.step}
        frameSize={controls.frameSize}
        itemWidth={controls.itemWidth}
        animationDuration={controls.animationDuration}
      />
    </div>
  );
};
