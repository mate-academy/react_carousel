/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import './App.scss';
import { useAppSelector } from './app/hooks';
import { Carousel } from './components/Carousel';

import { FormParams } from './components/FormParams';

const App: React.FC = () => {
  const { images } = useAppSelector(state => state.images);

  return (
    <div className="app">
      <h1 data-cy="title ">
        Carousel with {images.length} images
      </h1>

      <FormParams />

      <Carousel />
    </div>
  );
};

export default App;
