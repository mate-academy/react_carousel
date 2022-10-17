import React from 'react';
import './App.scss';
import { Carousel } from './components';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="parameters-of-carousel">
          <label className="parameters-of-carousel__label">
            Choose item width in px:
            <input
              className="parameters-of-carousel__input"
              name="itemWidth"
              type="number"
              value={itemWidth}
              onChange={(event) => {
                if (+event.target.value >= 50 && +event.target.value < 300) {
                  this.setState({ itemWidth: +event.target.value });
                }
              }}
            />
          </label>

          <label className="parameters-of-carousel__label">
            Choose frame size:
            <input
              className="parameters-of-carousel__input"
              name="frameSize"
              type="number"
              value={frameSize}
              onChange={(event) => {
                if (
                  +event.target.value >= 1
                    && +event.target.value <= images.length
                ) {
                  this.setState({ frameSize: +event.target.value });
                }
              }}
            />
          </label>

          <label className="parameters-of-carousel__label">
            Choose step:
            <input
              className="parameters-of-carousel__input"
              name="step"
              type="number"
              value={step}
              onChange={(event) => {
                if (
                  +event.target.value >= 1
                    && +event.target.value <= images.length
                ) {
                  this.setState({ step: +event.target.value });
                }
              }}
            />
          </label>

          <label className="parameters-of-carousel__label">
            Choose animation duration in ms:
            <input
              className="parameters-of-carousel__input"
              name="animationDuration"
              type="number"
              value={animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: +event.target.value });
              }}
            />
          </label>

          <div className="parameters-of-carousel__isInfinite">
            Is carousel infinite:
            <div className="parameters-of-carousel__container">
              <div className="parameters-of-carousel__input">
                <input
                  name="infinite"
                  type="radio"
                  value="y"
                  onClick={() => {
                    this.setState({ infinite: true });
                  }}
                />
                Yes
              </div>

              <div className="parameters-of-carousel__input">
                <input
                  name="infinite"
                  type="radio"
                  value="n"
                  checked={!infinite}
                  onClick={() => {
                    this.setState({ infinite: false });
                  }}
                />
                No
              </div>
            </div>
          </div>
        </div>

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
