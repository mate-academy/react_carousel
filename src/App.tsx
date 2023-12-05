import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './types/State';
import { InputId } from './types/InputId';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<State>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

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

  type InputEvent = React.ChangeEvent<HTMLInputElement>
  & { target: { id: keyof typeof InputId } };

  function handleInput(event: InputEvent) {
    if (event.target.id === 'infiniteId') {
      setSettings(prevSettings => ({
        ...prevSettings,
        [InputId[event.target.id]]: !prevSettings.infinite,
      }));

      return;
    }

    setSettings(prevSettings => ({
      ...prevSettings,
      [InputId[event.target.id]]: event.target.value,
    }));
  }

  return (
    <div className="App">
      <h1 data-cy="title">Emotional Carousel</h1>

      <div className="App__container">
        <label className="App__label" htmlFor="itemId">
          Item Width:
          <input
            className="App__input"
            type="number"
            id="itemId"
            min={50}
            max={390}
            step={5}
            value={settings.itemWidth}
            onChange={handleInput}
          />
        </label>

        <label className="App__label" htmlFor="frameId">
          Frame Size:
          <input
            className="App__input"
            type="number"
            id="frameId"
            min={1}
            max={images.length}
            value={settings.frameSize}
            onChange={handleInput}
          />
        </label>

        <label className="App__label" htmlFor="stepId">
          Step:
          <input
            className="App__input"
            type="number"
            id="stepId"
            min={1}
            max={images.length}
            value={settings.step}
            onChange={handleInput}
          />
        </label>

        <label className="App__label" htmlFor="animationDurationId">
          Animation Duration:
          <input
            className="App__input"
            type="number"
            id="animationDurationId"
            min={50}
            step={50}
            value={settings.animationDuration}
            onChange={handleInput}
          />
        </label>

        <label className="App__label" htmlFor="infiniteId">
          Infinite:
          <input
            className="App__switch"
            type="checkbox"
            id="infiniteId"
            onChange={handleInput}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={settings.step}
        frameSize={settings.frameSize}
        itemWidth={settings.itemWidth}
        animationDuration={settings.animationDuration}
        infinite={settings.infinite}
      />
    </div>
  );
};

export default App;
