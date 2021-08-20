import React from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';

import CarouselBlock from './components/CarouselBlock';

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
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <CarouselBlock
          images={images}
        />
      </div>
    );
  }
}

export default App;
