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
    image: initialImages,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const setNewState = (newState: Partial<State>): void => {
    setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        Carousel with {initialImages.length} images
      </h1>
      <Carousel
        images={state.image}
        step={state.step}
        frameSize={state.frameSize}
        itemWidth={state.itemWidth}
        animationDuration={state.animationDuration}
        infinite={state.infinite}
        setNewState={setNewState}
      />
    </div>
  );
};

export default App;
