import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App = () => {
  const [images] = useState([
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
  ]);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, max,
    } = event.currentTarget;
    const min = 0;
    const defaultValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value)),
    );

    switch (name) {
      case 'itemWidth':
        setItemWidth(defaultValue);
        break;
      case 'frameSize':
        setFrameSize(defaultValue);
        break;
      case 'step':
        setStep(defaultValue);
        break;
      case 'animationDuration':
        setAnimationDuration(defaultValue);
        break;
      case 'infinite':
        setInfinite(event.currentTarget.checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {' '}
        {images.length}
        {' '}
        images
      </h1>
      <fieldset>
        <label htmlFor="itemId">Item width</label>
        <input
          id="itemId"
          name="itemWidth"
          type="number"
          value={itemWidth.toString()}
          onChange={onChangeHandler}
          max={1300}
        />

        <label htmlFor="frameId">Frame size</label>
        <input
          id="frameId"
          name="frameSize"
          type="number"
          value={frameSize.toString()}
          onChange={onChangeHandler}
          max={Math.floor(1300 / itemWidth)}
        />
        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          name="step"
          type="number"
          value={step.toString()}
          onChange={onChangeHandler}
          max={images.length}
        />
        <label htmlFor="animationDuration">Animation duration</label>
        <input
          name="animationDuration"
          type="number"
          value={animationDuration.toString()}
          onChange={onChangeHandler}
          max={10000}
        />
        <label>
          Infinite
          <input
            name="infinite"
            type="checkbox"
            onChange={onChangeHandler}
            checked={infinite}
          />
        </label>
      </fieldset>
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

export default App;
