import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const state: State = {
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
  };

  const { images } = state;
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [toggleChecked, setToggleChecked] = useState(false);

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <div className="settings">
        <label
          htmlFor="itemId"
          className="settings__label"
        >
          Set item width:
          <input
            className="settings__input"
            type="number"
            id="itemId"
            defaultValue={itemWidth}
            min={30}
            max={520}
            onChange={(event) => {
              setItemWidth(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="frameId"
          className="settings__label"
        >
          Set frame size:
          <input
            className="settings__input"
            type="number"
            id="frameId"
            defaultValue={frameSize}
            min={1}
            max={images.length}
            onChange={(event) => {
              setFrameSize(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="stepId"
          className="settings__label"
        >
          Set step:
          <input
            className="settings__input"
            type="number"
            id="stepId"
            defaultValue={step}
            min={1}
            max={images.length}
            onChange={(event) => {
              setStep(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="animationId"
          className="settings__label"
        >
          Set animation duration:
          <input
            className="settings__input"
            type="number"
            id="animationId"
            defaultValue={animationDuration}
            max={5000}
            step={500}
            onChange={(event) => {
              setAnimationDuration(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="infiniteId"
          className="settings__label"
        >
          Set infinity animation:
          <input
            type="checkbox"
            id="infiniteId"
            checked={toggleChecked}
            onChange={() => {
              setToggleChecked(checked => !checked);
            }}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={toggleChecked}
      />
    </div>
  );
};

export default App;
