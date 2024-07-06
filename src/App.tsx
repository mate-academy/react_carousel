import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { images } from './api/images';
import { CarouselForm } from './components/CarouselForm/CarouselForm';

const App: React.FC = () => {
  const [currentData, setCurrentData] = useState({
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    duration: 1000,
  });

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>
      <Carousel
        images={images}
        data={currentData}
      />
      <CarouselForm
        onSubmit={setCurrentData}
      />
    </div>
  );
};

export default App;
