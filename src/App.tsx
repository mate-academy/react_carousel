import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
}

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
    const imageWidth = 130;
    const visibleImages = 3;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={visibleImages}
          itemWidth={imageWidth}
          animationDuration={5000}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
