import React, { useState } from 'react';

import './App.scss';
import Carousel from './components/Carousel';

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

const getCountInRange = (value: string, max: number, min: number) => {
  const number = +value;

  if (number > max) {
    return max;
  }

  if (number < min) {
    return min;
  }

  return number;
};

const App: React.FC = () => {
  const [inputs, setInputs] = useState({
    frameSize: 3,
    step: 3,
    itemWidth: 130,
    animationDuration: 1000,
  });
  const [marginLeft, setMarginLeft] = useState(0);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: (getCountInRange(value, 10, 1)),
    }));
  };

  const onChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: (getCountInRange(value, 200, 80)),
    }));
    setMarginLeft(0);
  };

  const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: (getCountInRange(value, 5000, 250)),
    }));
  };

  return (
    <div className="App">
      <h1
        className="title"
        data-cy="title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <form className="App__form">
        <label
          htmlFor="itemId"
          className="App__label"
        >
          Item width:

          <input
            className="App__input"
            type="number"
            name="itemWidth"
            id="itemId"
            min={80}
            max={200}
            value={inputs.itemWidth}
            onChange={onChangeWidth}
          />
        </label>

        <label
          htmlFor="frameId"
          className="App__label"
        >
          Frame size:

          <input
            className="App__input"
            type="number"
            name="frameSize"
            id="frameId"
            min={1}
            max={10}
            value={inputs.frameSize}
            onChange={onChange}
          />
        </label>

        <label
          htmlFor="stepId"
          className="App__label"
        >
          Step:

          <input
            className="App__input"
            type="number"
            name="step"
            id="stepId"
            min={1}
            max={9}
            value={inputs.step}
            onChange={onChange}
          />
        </label>

        <label
          htmlFor="animationDuration"
          className="App__label"
        >
          Animation duration:

          <input
            className="App__input"
            type="number"
            name="animationDuration"
            id="animationDuration"
            min={250}
            max={5000}
            step={250}
            value={inputs.animationDuration}
            onChange={onChangeDuration}
          />
        </label>
      </form>

      <Carousel
        images={images}
        step={inputs.step}
        frameSize={inputs.frameSize}
        itemWidth={inputs.itemWidth}
        animationDuration={inputs.animationDuration}
        marginLeft={marginLeft}
        setMarginLeft={setMarginLeft}
      />
    </div>
  );
};

export default App;
