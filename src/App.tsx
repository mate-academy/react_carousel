import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Form } from './components/Form';

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

export const App: React.FC = () => {
  const [stepSize, setStepSize] = useState(3);
  const [frameVisible, setFrameVisible] = useState(3);
  const [itemSize, setItemSize] = useState(130);
  const [speedValue, setSpeedValue] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <Form
        members={images.length}
        pace={stepSize}
        enteredStep={setStepSize}
        frame={frameVisible}
        enteredFrame={setFrameVisible}
        size={itemSize}
        enteredSize={setItemSize}
        speed={speedValue}
        enteredSpeed={setSpeedValue}
        infinite={infinite}
        setInfinite={setInfinite}
      />

      <Carousel
        images={images}
        step={stepSize}
        frameSize={frameVisible}
        itemWidth={itemSize}
        animationDuration={speedValue}
        infinite={infinite}
      />
    </div>
  );
};
