import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

export const App:React.FC = () => {
  const [settings, setSettings] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const {
    step, frameSize, itemWidth, animationDuration, infinite,
  } = settings;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = e.target;

    setSettings(prevSettings => (
      {
        ...prevSettings,
        [name]: type === 'checkbox' ? checked : +value,
      }
    ));
  };

  return (
    <div className="App">
      <h1
        data-cy="title"
        className="App__title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <form
        className="App__form"
        action="#"
      >
        <div className="mb-2">
          <label htmlFor="step" className="form-label">
            Step:
          </label>
          <input
            value={step}
            onChange={handleChange}
            type="number"
            className="form-control form-control-sm"
            name="step"
            id="step"
            min={1}
            max={10}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="frameSize" className="form-label">
            Frame size:
          </label>
          <input
            value={frameSize}
            onChange={handleChange}
            type="number"
            className="form-control form-control-sm"
            name="frameSize"
            id="frameSize"
            min={1}
            max={10}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="itemWidth" className="form-label">
            Item width:
          </label>
          <input
            value={itemWidth}
            onChange={handleChange}
            type="number"
            className="form-control form-control-sm"
            name="itemWidth"
            id="itemWidth"
            min={100}
            max={260}
            step={10}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="animationDuration" className="form-label">
            Animation duration:
          </label>
          <input
            value={animationDuration}
            onChange={handleChange}
            type="number"
            className="form-control form-control-sm"
            name="animationDuration"
            id="animationDuration"
            min={500}
            max={10000}
            step={500}
          />
        </div>
        <div className="form-check form-switch mb-2">
          <label htmlFor="flexSwitchCheckDefault" className="form-check-label">
            Infinite
          </label>
          <input
            checked={infinite}
            onChange={handleChange}
            type="checkbox"
            className="form-check-input"
            role="switch"
            name="infinite"
            id="flexSwitchCheckDefault"
          />
        </div>
      </form>

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
