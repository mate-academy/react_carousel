import 'bulma';
import React, { useState } from 'react';
import './App.scss';
import { ImgValuesType } from './types/ImgValuesType';
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

const defaultImgValues: ImgValuesType = {
  images,
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

export const App: React.FC = () => {
  const [imgValues, setImgValues] = useState(defaultImgValues);
  const [transform, setTransform] = useState(0);

  return (
    <div className="App section">
      <h1
        data-cy="title"
        className="title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <Carousel
        imgValues={imgValues}
        transform={transform}
        setTransform={setTransform}
      />

      <Form
        imgValues={imgValues}
        setImgValues={setImgValues}
      />
    </div>
  );
};
