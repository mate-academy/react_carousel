import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';
import { Form } from './components/Form/Form';
import images from './api/api';

const App: React.FC = () => {
  const [settings, setSettings] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const newValue = name === 'infinite' ? !settings.infinite : +value;

    setSettings(prevOptions => ({
      ...prevOptions,
      [name]: newValue,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <Carousel images={images} {...settings} />
      <Form {...settings} handleChange={handleChange} />
    </div>
  );
};

export default App;
