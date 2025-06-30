import './App.scss';
import React, { useState } from 'react';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [images] = useState<string[]>([
    '/img/1.png',
    '/img/2.png',
    '/img/3.png',
    '/img/4.png',
    '/img/5.png',
    '/img/6.png',
    '/img/7.png',
    '/img/8.png',
    '/img/9.png',
    '/img/10.png',
  ]);

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    switch (name) {
      case 'step':
        setStep(numericValue);
        break;
      case 'frameSize':
        setFrameSize(numericValue);
        break;
      case 'itemWidth':
        setItemWidth(numericValue);
        break;
      case 'animationDuration':
        setAnimationDuration(numericValue);
        break;
    }
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title" className="Title">Carousel with {images.length} images</h1>

      <div className="form">
        <form>
          <label className="Label__style">
            Step:
            <input
              id="stepId"
              type="number"
              className="Input__style"
              name="step"
              value={step}
              onChange={handleChange}
            />
          </label>
          <label className="Label__style">
            Frame Size:
            <input
              type="number"
              className="Input__style"
              name="frameSize"
              value={frameSize}
              onChange={handleChange}
            />
          </label>
          <label className="Label__style">
            Item Width:
            <input
              type="number"
              className="Input__style"
              name="itemWidth"
              value={itemWidth}
              onChange={handleChange}
            />
          </label>
          <label className="Label__style">
            Animation:
            <input
              type="number"
              className="Input__style"
              name="animationDuration"
              value={animationDuration}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
