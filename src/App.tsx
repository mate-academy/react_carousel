import { useState } from 'react';
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

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameWidth, setFrameWidth] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWidth(+event.target.value);
  };

  const handleFrameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrameWidth(+event.target.value);
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(+event.target.value);
  };

  const handleAnimationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnimationDuration(+event.target.value);
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}

      <h1
        data-cy="title"
      >
        Carousel with
        {images.length}
        {' '}
        images
      </h1>
      <label htmlFor="itemId">itemWidth</label>
      <input
        id="itemId"
        type="number"
        min={130}
        max={260}
        value={itemWidth}
        // onChange={() => setItemWidth()}
        onChange={handleItemChange}
      />

      <label htmlFor="frameId">frameWidth</label>
      <input
        id="frameId"
        type="number"
        min={1}
        max={10}
        value={frameWidth}
        onChange={handleFrameChange}
      />

      <label htmlFor="stepId">Step</label>
      <input
        id="stepId"
        type="number"
        min={1}
        max={10}
        value={step}
        onChange={handleStepChange}
      />
      <label htmlFor="animationId">Animation duration</label>
      <input
        id="animationId"
        type="number"
        min={500}
        max={3000}
        value={animationDuration}
        onChange={handleAnimationChange}
      />

      <label htmlFor="infiniteId">Infinite</label>
      <input
        id="infiniteId"
        type="checkbox"
        checked={infinite}
        onChange={() => setInfinite(!infinite)}
      />

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameWidth={frameWidth}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />

    </div>
  );
};
