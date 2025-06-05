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

const App = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const handleChangeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setStep(Number(event.target.value));
  };

  const handleChangeFrameSize = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    return setFrameSize(Number(event.target.value));
  };

  const handleChangeItemWidth = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    return setItemWidth(Number(event.target.value));
  };

  const handleChangeAnimationDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    return setAnimationDuration(Number(event.target.value));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <label htmlFor="stepId">Прокрутити за раз</label>
      <br />
      <input
        min={1}
        type="number"
        id="stepId"
        name="step"
        value={step}
        onChange={handleChangeStep}
      />

      <br />
      <br />

      <label htmlFor="frameId">Демонструється</label>
      <br />
      <input
        min={1}
        max={images.length}
        type="number"
        id="frameId"
        name="frameSize"
        value={frameSize}
        onChange={handleChangeFrameSize}
      />

      <br />
      <br />

      <label htmlFor="itemId">Розмір картинок</label>
      <br />
      <input
        min={1}
        type="number"
        id="itemId"
        name="itemWidth"
        value={itemWidth}
        onChange={handleChangeItemWidth}
      />

      <br />
      <br />

      <label htmlFor="animationDurationId">Тривалість анімації</label>
      <br />
      <input
        min={1}
        type="number"
        id="animationDurationId"
        name="animationDuration"
        value={animationDuration}
        onChange={handleChangeAnimationDuration}
      />

      <br />
      <br />

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
