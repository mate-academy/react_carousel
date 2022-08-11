import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { FormList } from './components/FormList';

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

const App: React.FC<{}> = () => {
  const [values, setValues] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {images.length}
        images
      </h1>

      <FormList
        step={values.step}
        frameSize={values.frameSize}
        itemWidth={values.itemWidth}
        animationDuration={values.animationDuration}
        infinite={values.infinite}
        onSetValue={setValues}
      />

      <Carousel
        images={images}
        step={values.step}
        frameSize={values.frameSize}
        itemWidth={values.itemWidth}
        animationDuration={values.animationDuration}
        infinite={values.infinite}
      />
    </div>
  );
};

export default App;
