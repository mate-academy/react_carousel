import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

class App extends React.Component<{}, State> {
  state = {
    images: [
      './img/1.jpg',
      './img/2.png',
      './img/3.jpg',
      './img/4.png',
      './img/6.jpg',
      './img/8.jpg',
      './img/9.jpg',
      './img/5.jpg',
      './img/7.jpg',
      './img/10.jpg',
    ],
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy>Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={3}
          frameSize={3}
          itemWidth={390}
          animationDuration={1000}
        />
      </div>
    );
  }
}

export default App;
