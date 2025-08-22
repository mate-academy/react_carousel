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

export const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [frame, setFrame] = useState(3);
  const [animation, setAnimation] = useState(1000);
  const [width, setWidth] = useState(130);
  const [infinite, setInfinite] = useState(false);

  const handleChangeStep = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStep(Number(e.target.value));
  };

  const handleChangeFrame = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrame(Number(e.target.value));
  };

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimation(Number(e.target.value));
  };

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  const handleChangeInfinite = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInfinite(e.target.value === 'true');
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <div className="container">
        <h1>Carousel with {images.length} images</h1>
        <Carousel
          images={images}
          step={step}
          frameSize={frame}
          itemWidth={width}
          animationDuration={animation}
          infinite={infinite}
        />
        <div className="selects">
          <label htmlFor="step">Choose step:</label>
          <select name="step" id="step" onChange={handleChangeStep}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3" selected>
              3
            </option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="frame">Choose frameSize:</label>
          <select name="frame" id="frame" onChange={handleChangeFrame}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3" selected>
              3
            </option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="duration">Choose duration:</label>
          <input
            type="number"
            id="duration"
            value={animation}
            min={100}
            max={5000}
            step={100}
            onChange={handleChangeDuration}
          />
          <label htmlFor="width">Choose item width:</label>
          <input
            type="number"
            id="width"
            value={width}
            min={130}
            max={500}
            step={1}
            onChange={handleChangeWidth}
          />
          <label htmlFor="infinite">Infinite loop:</label>
          <select name="infinite" id="infinite" onChange={handleChangeInfinite}>
            <option value="true">Yes</option>
            <option value="false" selected>
              No
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
