import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  scrollRight = () => {
    const carousel = document.querySelector('.Carousel__list');

    if (carousel !== null) {
      carousel.scrollLeft += this.state.step * this.state.itemWidth;
    }
  };

  scrollLeft = () => {
    const carousel = document.querySelector('.Carousel__list');

    if (carousel !== null) {
      carousel.scrollLeft -= this.state.step * this.state.itemWidth;
    }
  };

  render() {
    const {
      images, itemWidth, frameSize, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>
        <form method="get" className="App__form">
          Photo width:
          <input
            type="number"
            id="width"
            onChange={(event) => {
              this.setState({ itemWidth: +event.target.value });
            }}
          />
          Number of images displayed:
          <input
            type="number"
            id="imagesDisplayed"
            onChange={(event) => {
              this.setState({ frameSize: +event.target.value });
            }}
          />
          Number of images scrolled per click:
          <input
            type="number"
            id="imagesScrolled"
            onChange={(event) => {
              this.setState({ step: +event.target.value });
            }}
          />
          Animation duration:
          <input
            type="number"
            placeholder="ms"
            id="animation"
            onChange={(event) => {
              this.setState({ animationDuration: +event.target.value });
            }}
          />
        </form>
        <div className="Carousel">
          <Carousel
            img={images}
            width={itemWidth}
            frame={frameSize}
            animation={animationDuration}
          />

          <button type="button" onClick={this.scrollLeft} className="button">
            <div className="button__arrow button__arrow--left" />
          </button>
          <button type="button" onClick={this.scrollRight} className="button">
            <div className="button__arrow button__arrow--right" />
          </button>
        </div>
      </div>
    );
  }
}

export default App;
