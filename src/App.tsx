import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={120} // Customizable carousel item width
          frameSize={3} // Number of images visible at a time
          step={2} // Number of images to scroll on each click
          animationDuration={800} // Duration of animation in milliseconds
          infinite={true} // Enable infinite scrolling
        />
      </div>
    );
  }
}

export default App;
