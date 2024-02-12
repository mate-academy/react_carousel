import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './types/State';

const App: React.FC = () => {
  const initialImages = [
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

  const [state, setState] = useState<State>({
    images: initialImages,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const setAppState = (newState: Partial<State>): void => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = state;

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        {infinite
          ? 'Carousel with ∞ images'
          : `Carousel with ${images.length} images`}
      </h1>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        setAppState={setAppState}
      />
    </div>
  );
};

export default App;
