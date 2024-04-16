import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const images: string[] = [
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

type Inputs = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const defaultProp: Inputs = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

const App: React.FC = () => {
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputs, setInputs] = useState(defaultProp);
  const [position, setPosition] = useState(0);
  const [maxPosition, setMaxPosition] = useState(
    -images.length + defaultProp.frameSize,
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'infinite') {
      setInputs((prevState: Inputs) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    } else if (event.target.name === 'frameSize') {
      const newFrameSize = +event.target.value;

      setInputs((prevState: Inputs) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setMaxPosition(-images.length + newFrameSize);
      if (position === maxPosition) {
        setPosition(-images.length + newFrameSize);
      }
    } else {
      setInputs((prevState: Inputs) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="App__form" action="/">
        <label htmlFor="itemId" className="App__label">
          Image width
          <input
            className="App__input"
            type="number"
            id="itemId"
            min={130}
            max={390}
            step={10}
            name="itemWidth"
            value={inputs.itemWidth}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="frameId" className="App__label">
          Frame size
          <input
            className="App__input"
            type="number"
            id="frameId"
            min={1}
            max={10}
            step={1}
            name="frameSize"
            value={inputs.frameSize}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="stepId" className="App__label">
          Step
          <input
            className="App__input"
            type="number"
            id="stepId"
            min={1}
            max={10}
            step={1}
            name="step"
            value={inputs.step}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="animationDuration" className="App__label">
          Animation Duration
          <input
            className="App__input"
            type="number"
            id="animationDuration"
            min={500}
            max={5000}
            step={500}
            name="animationDuration"
            value={inputs.animationDuration}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="infinite" className="App__label">
          Infinite
          <input
            type="checkbox"
            id="infinite"
            name="infinite"
            checked={inputs.infinite}
            onChange={handleInput}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={inputs.itemWidth}
        frameSize={inputs.frameSize}
        step={inputs.step}
        animationDuration={inputs.animationDuration}
        infinite={inputs.infinite}
        position={position}
        maxPosition={maxPosition}
        setPosition={setPosition}
      />
    </div>
  );
};

export default App;
