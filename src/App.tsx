import React from 'react';
import './App.scss';
import './components/Carousel.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  step: number;
  frame: number;
  moveSpeed: number;
  infinite: boolean;
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
    itemWidth: 130,
    step: 3,
    frame: 3,
    moveSpeed: 1000,
    infinite: false,
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={this.state.step}
          frameSize={this.state.frame}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.moveSpeed}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
