import React from 'react';
import './App.css';

import { Carousel } from './components/Carousel/Carousel';

let count = 1;

class App extends React.Component {
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
      './img/11.png',
    ],
    currentPosition: 0,
    itemWidth: 256,
    frameSize: 3,
    step: 3,
  };

  nextImage = () => {
    count += 1;

    let { step } = this.state;
    const { images, frameSize } = this.state;

    if (step * count - images.length > frameSize) {
      return;
    }

    if (images.length - step * count < 0) {
      step -= step * count - images.length;
    }

    this.setState(prevState => ({
      currentPosition: prevState.currentPosition - step
      * prevState.itemWidth,
    }));
  }

  prevImage = () => {
    count -= 1;

    let { step } = this.state;
    const { images, frameSize } = this.state;

    if (step * count - images.length > frameSize) {
      return;
    }

    if (images.length - step * count < 0) {
      step -= step * count - images.length;
    }

    this.state.currentPosition && this.setState(prevState => ({
      currentPosition: prevState.currentPosition + step
      * prevState.itemWidth,
    }));
  }

  render() {
    const {
      images,
      currentPosition,
      itemWidth,
      frameSize,
      step,
    } = this.state;

    return (
      <div className="App">
        <h1 className="Carousel__title">Comic Heroes Carousel</h1>

        <Carousel
          images={images}
          currentPos={currentPosition}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={1000}
          prev={this.prevImage}
          next={this.nextImage}
        />
      </div>
    );
  }
}

export default App;
