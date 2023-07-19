import React, { useState } from 'react';

import './reset.scss';
import './App.scss';

import Form from './components/Form/Form';
import Carousel from './components/Carousel/Carousel';
import { images } from './components/Img/Img';
import { Params } from './components/Types/Params';

const App: React.FC = () => {
  const [vizibleParam, setVizibleParam] = useState<Params>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const changeImgPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, value, name,
    } = event.target;

    setVizibleParam(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : +value,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {' '}
        {images.length}
        {' '}
        images
      </h1>

      <Carousel
        images={images}
        vizibleParam={vizibleParam}
      />

      <Form
        vizibleParam={vizibleParam}
        changeImgPosition={changeImgPosition}
      />
    </div>
  );
};

export default App;
