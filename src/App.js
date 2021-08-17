import React from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';

import Carousel from './components/Carousel';

class App extends React.Component {
  state = {
    images: [
      {img: './img/1.png', id: uuidv4(), alt: 'Shy smile'},
      {img: './img/2.png', id: uuidv4(), alt: 'Clever smile'},
      {img: './img/3.png', id: uuidv4(), alt: 'Funny smile'},
      {img: './img/4.png', id: uuidv4(), alt: 'Smile'},
      {img: './img/5.png', id: uuidv4(), alt: 'Smile in love'},
      {img: './img/6.png', id: uuidv4(), alt: 'Explosive smile'},
      {img: './img/7.png', id: uuidv4(), alt: 'Ninja smile'},
      {img: './img/8.png', id: uuidv4(), alt: 'Brutal smile'},
      {img: './img/9.png', id: uuidv4(), alt: 'Surprised smile'},
      {img: './img/10.png', id: uuidv4(), alt: 'Offended smile'},
    ],
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: true,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
