import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface AppProps {
  images?: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const App: React.FC<AppProps> = () => {
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

  const [itemWidth, setItemWidth] = useState<number>(130);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [infinite, setInfinite] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <Carousel
        images={images}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        frameSize={frameSize}
        infinite={infinite}
        step={step}
      />

      <label htmlFor="itemId">
        Item width:
        <input
          type="number"
          id="itemId"
          value={itemWidth}
          min={130}
          max={1300}
          step={10}
          onChange={(e) => setItemWidth(Number(e.target.value))}
          placeholder="Width of item"
        />
      </label>

      <label htmlFor="frameId">
        Number of images to display:
        <input
          type="number"
          id="frameId"
          value={frameSize}
          min={1}
          max={10}
          step={1}
          onChange={(e) => setFrameSize(Number(e.target.value))}
          placeholder="Number of images to display"
        />
      </label>

      <label htmlFor="stepId">
        Number of images scrolled:
        <input
          type="number"
          id="stepId"
          name="step"
          min={1}
          max={10}
          step={1}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </label>

      <label>
        Animation Duration:
        <input
          type="number"
          value={animationDuration}
          min={100}
          max={10000}
          step={100}
          onChange={(e) => setAnimationDuration(Number(e.target.value))}
          placeholder="Animation Duration"
        />
      </label>

      <label>
        Carousel cyclic:
        <input
          type="checkbox"
          name="infinite"
          checked={infinite}
          onChange={(e) => setInfinite(e.target.checked)}
        />
      </label>
    </div>
  );
};

export default App;
