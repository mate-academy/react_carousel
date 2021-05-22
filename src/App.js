import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';

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
    translate: 0,
    slidesCount: 3,
  };

  nextSlide = () => {
    const { images, step, itemWidth,
      infinite, slidesCount } = this.state;

    const oneMove = itemWidth * step;

    if (images.length === slidesCount && infinite) {
      this.setState(state => ({
        translate: 0,
        slidesCount: state.frameSize,
      }));
    } else if ((images.length - slidesCount) < step) {
      this.setState(state => ({
        translate: state.translate
          - (images.length - slidesCount) * itemWidth,
        slidesCount: state.slidesCount + (images.length - slidesCount),
      }));
    } else {
      this.setState(state => ({
        translate: state.translate - oneMove,
        slidesCount: state.slidesCount + step,
      }));
    }
  }

  prevSlide = () => {
    const { images, step, frameSize, itemWidth,
      infinite, slidesCount } = this.state;

    const oneMove = itemWidth * step;

    if (slidesCount === frameSize && infinite) {
      this.setState({
        translate: -(itemWidth * images.length) + (itemWidth * frameSize),
        slidesCount: images.length,
      });
    } else if ((slidesCount - frameSize) < frameSize) {
      this.setState(state => ({
        translate: state.translate + (slidesCount - frameSize) * itemWidth,
        slidesCount: frameSize,
      }));
    } else {
      this.setState(state => ({
        translate: state.translate + oneMove,
        slidesCount: state.slidesCount - step,
      }));
    }
  }

  render() {
    const { images, step, frameSize, itemWidth,
      animationDuration, infinite, translate } = this.state;

    return (
      <div className="App">
        <h1 className="App__header">
          {/* eslint-disable-next-line */}
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          translate={translate}
          nextSlide={this.nextSlide}
          prevSlide={this.prevSlide}
        />
        <div className="App__inputFields">
          <label htmlFor="step">
            Number of images scrolled per click
          </label>
          <input
            type="number"
            defaultValue={step}
            name="step"
            id="step"
            onChange={({ target }) => {
              this.setState({
                step: +target.value,
              });
            }}
          />
          <label htmlFor="frameSize">
            Number of images displayed at the same time
          </label>
          <input
            type="number"
            defaultValue={frameSize}
            name="frameSize"
            id="frameSize"
            onChange={({ target }) => {
              this.setState({
                frameSize: +target.value,
                slidesCount: +target.value,
              });
            }}
          />
          <label htmlFor="itemWidth">
            Width of the one picture
          </label>
          <input
            type="number"
            defaultValue={itemWidth}
            name="itemWidth"
            id="itemWidth"
            onChange={({ target }) => {
              this.setState({
                itemWidth: +target.value,
              });
            }}
          />
          <label htmlFor="animationDuration">
            Time in ms to show the new portion of images
          </label>
          <input
            type="number"
            defaultValue={animationDuration}
            name="animationDuration"
            id="animationDuration"
            onChange={({ target }) => {
              this.setState({
                animationDuration: +target.value,
              });
            }}
          />
          <label htmlFor="infinite">
            To do the carousel cyclic
          </label>
          <input
            type="checkbox"
            name="infinite"
            id="infinite"
            defaultChecked={infinite && true}
            onChange={({ target }) => {
              this.setState({
                infinite: target.checked,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
