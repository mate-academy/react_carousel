import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Form } from './components/Form';
import { ValuesImgType } from './types/Types';

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

const defaultValues: ValuesImgType = {
  images,
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

export const App: React.FC = () => {
  const [valuesImage, setValuesImage] = useState(defaultValues);
  const [transform, setTransform] = useState(0);

  return (
    <div className="App section">
      {/* eslint-disable-next-line */}
      <h1 data-cy='title' className="title">Carousel with {images.length} images</h1>

      <Carousel
        valuesImage={valuesImage}
        transform={transform}
        setTransform={(value) => setTransform(value)}
      />
      <Form
        valuesImage={valuesImage}
        setValuesImage={(value) => setValuesImage(value)}
      />
    </div>
  );
};
