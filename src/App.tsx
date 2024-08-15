import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { Settings } from './components/Settings';
import { images, settingsInitial } from './utilities';

export const App: React.FC = () => {
  const [settings, setSettings] = useState({
    ...settingsInitial,
  });

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Settings {...settings} setSettings={setSettings} />

      <Carousel {...settings} images={images} />
    </div>
  );
};
