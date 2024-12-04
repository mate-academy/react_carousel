import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Form from './components/Form/Form';

const App = () => {
  const [
    { step, frameSize, itemWidth, animationDuration, infinite },
    setCarouselParam,
  ] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const handleFormChange = (newValues: {
    step?: number;
    frameSize?: number;
    itemWidth?: number;
    animationDuration?: number;
    infinite?: boolean;
  }) => {
    setCarouselParam(prevValue => ({
      ...prevValue,
      ...newValues,
    }));
  };

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

  return (
    <div className="App">
      <div className="main__container">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <Form
          onChange={handleFormChange}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    </div>
  );
};

export default App;
