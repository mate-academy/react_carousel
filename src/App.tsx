import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
}

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

export const App: React.FC = () => {
  const { images } = state;
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={false}
      />

      <form>
        <label htmlFor="itemWidth">Item Width:</label>
        <input
          type="number"
          id="itemWidth"
          name="itemWidth"
          value={itemWidth}
          onChange={event => setItemWidth(+event.target.value)}
        />
        <br />

        <label htmlFor="frameSize">Frame Size:</label>
        <input
          type="number"
          id="frameSize"
          name="frameSize"
          value={frameSize}
          onChange={event => setFrameSize(+event.target.value)}
        />
        <br />

        <label htmlFor="step">Step:</label>
        <input
          type="number"
          id="step"
          name="step"
          value={step}
          onChange={event => setStep(+event.target.value)}
        />
        <br />

        <label htmlFor="animationDuration">Animation Duration:</label>
        <input
          type="number"
          id="animationDuration"
          name="animationDuration"
          value={animationDuration}
          onChange={event => setAnimationDuration(+event.target.value)}
        />
        <br />
      </form>
    </div>
  );
};
