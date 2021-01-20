import React from 'react';
import './App.css';

import Carousel from './components/Carousel';
import MainForm from './components/Form';

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
    ],
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    counter: 3,
    translateX: 0,
  };

  paramFromInputs
    = (frameSize, itemWidth, animationDuration, step, infinite, counter) => {
      this.setState(() => ({
        frameSize,
        itemWidth,
        animationDuration,
        step,
        infinite,
        counter,
        translateX: 0,
      }));
    }

  nextSlide = () => {
    const { images, counter, itemWidth, step, infinite } = this.state;

    if (images.length === counter && infinite) {
      this.setState(prevState => ({
        translateX: 0,
        counter: prevState.frameSize,
      }));
    } else if (images.length - counter < step) {
      this.setState(prevState => ({
        translateX: prevState.translateX
          - (images.length - counter) * itemWidth,
        counter: prevState.counter + (images.length - counter),
      }));
    } else {
      this.setState(prevState => ({
        translateX: prevState.translateX - prevState.itemWidth * prevState.step,
        counter: prevState.counter + prevState.step,
      }));
    }
  }

  prevSlide = () => {
    const { counter, itemWidth, step, frameSize, infinite } = this.state;

    if (counter === frameSize && infinite) {
      this.setState(prevState => ({
        translateX: -(prevState.itemWidth * 10) + (itemWidth * frameSize),
        counter: prevState.images.length,
      }));
    } else if (this.state.counter - frameSize < frameSize) {
      this.setState(prevState => ({
        translateX: prevState.translateX + (counter - frameSize) * itemWidth,
        counter: prevState.frameSize,
      }));
    } else {
      this.setState(prevState => ({
        translateX: prevState.translateX + itemWidth * step,
        counter: prevState.counter - prevState.step,
      }));
    }
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      translateX,
    } = this.state;

    return (
      <div className="App">
        <MainForm param={this.paramFromInputs} />
        <div>
          <h2>
            Carousel with
            {' '}
            {images.length}
            {' '}
            images
          </h2>
          <Carousel
            images={images}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            translateX={translateX}
            nextButton={this.nextSlide}
            prevButton={this.prevSlide}
          />
        </div>
      </div>
    );
  }
}

export default App;
