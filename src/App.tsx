import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Sizes } from './types/Sizes';

interface State {
  images: string[];
}

const sizes: Sizes = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: true,
};

class App extends React.Component<{}, State> {
  state = {
    images: [
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
    ],
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={sizes.itemWidth}
          frameSize={sizes.frameSize}
          step={sizes.step}
          animationDuration={sizes.animationDuration}
          infinite={sizes.infinite}
        />
      </div>
    );
  }
}

export default App;
