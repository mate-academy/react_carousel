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

  const [step, setStep] = useState<number>(3);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />

      <div className="inputs">
        <label htmlFor="stepId">Enter number of steps here &darr;</label>
        <input
          id="stepId"
          className="input"
          type="number"
          step={1}
          min={1}
          max={images.length}
          name="step"
          placeholder="Step"
          onChange={(event) => setStep(+event.target.value)}
        />

        <label htmlFor="frameId">Enter frame size here &darr;</label>
        <input
          id="frameId"
          className="input"
          type="number"
          step={1}
          min={1}
          max={images.length}
          name="frameSize"
          placeholder="Frame Size"
          onChange={(event) => setFrameSize(+event.target.value)}
        />

        <label htmlFor="itemId">Enter item width here &darr;</label>
        <input
          id="itemId"
          className="input"
          type="number"
          step={10}
          min={50}
          max={1300}
          name="itemWidth"
          placeholder="Item Width"
          onChange={(event) => setItemWidth(+event.target.value)}
        />

        <label htmlFor="animationDurationId">
          Enter animation duration here &darr;
        </label>
        <input
          id="animationDurationId"
          className="input"
          type="number"
          step={100}
          min={0}
          max={10000}
          name="animationDuration"
          placeholder="Animation Duration"
          onChange={(event) => setAnimationDuration(+event.target.value)}
        />
      </div>
    </div>
  );
};

export default App;
