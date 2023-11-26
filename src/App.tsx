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
  const [move, setMove] = useState(0);
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
        lengthMove={move}
        pace={stepSize}
        frame={frameVisible}
        size={itemSize}
        speed={speedValue}
        infinite={infinite}
        setLengthMove={setMove}
        enteredStep={setStepSize}
        enteredFrame={setFrameVisible}
        enteredSize={setItemSize}
        enteredSpeed={setSpeedValue}
        setInfinite={setInfinite}
      />

      <Carousel
        images={images}
        lengthMove={move}
        setLengthMove={setMove}
        step={stepSize}
        frameSize={frameVisible}
        itemWidth={itemSize}
        animationDuration={speedValue}
        infinite={infinite}
      />
    </div>
  );
};
