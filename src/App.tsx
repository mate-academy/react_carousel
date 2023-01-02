import { FC, useState } from 'react';
import { Carousel } from './components/Carousel';
import { Settings } from './components/_Settings';

import './App.scss';

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

export const App: FC<{}> = () => {
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);
  const [distance, setDistance] = useState(0);

  const props = {
    images,
    step,
    itemWidth,
    frameSize,
    animationDuration,
    infinite,
    distance,
  };

  const stateHooks = {
    setStep,
    setFrameSize,
    setAnimationDuration,
    setInfinite,
    setItemWidth,
    setDistance,
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1 className="title" data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          props={props}
          setDistance={setDistance}
        />

        <Settings
          props={props}
          hooks={stateHooks}
        />
      </div>
    </div>
  );
};
