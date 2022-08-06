import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: number,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: 0,
  };

  settings = [];

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration, infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form action="">
          <input
            type="text"
            defaultValue={3}
            className="Carousel__input"
            onChange={(event) => {
              this.setState({ step: +event.target.value });
            }}
          />
          <input
            type="text"
            defaultValue={3}
            className="Carousel__input"
            onChange={(event) => {
              this.setState({ frameSize: +event.target.value });
            }}
          />
          <input
            type="text"
            defaultValue={130}
            className="Carousel__input"
            onChange={(event) => {
              this.setState({ itemWidth: +event.target.value });
            }}
          />
          <input
            type="text"
            defaultValue={1000}
            className="Carousel__input"
            onChange={(event) => {
              this.setState({ animationDuration: +event.target.value });
            }}
          />
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
