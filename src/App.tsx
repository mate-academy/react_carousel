import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Form from './components/Form/Form';

const App: React.FC = () => {
  const [carouselParams, setCarouselParams] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

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

  const handleFormChange = (newValues: Partial<typeof carouselParams>) => {
    setCarouselParams(prevParams => {
      const updatedValues = { ...prevParams, ...newValues };

      return updatedValues;
    });
  };

  return (
    <div className="App">
      <h1 data-cy="title" className="title">
        Carousel with {images.length} images
      </h1>

      <Carousel images={images} {...carouselParams} />

      <Form onChange={handleFormChange} {...carouselParams} />
    </div>
  );
};

export default App;
