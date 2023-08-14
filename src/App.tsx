/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-mixed-operators */
import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  animationDuration: number;
  frameSize: number;
  itemWidth: number;
  moveLeft: number;
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
    animationDuration: 1000,
    frameSize: 3,
    itemWidth: 130,
    moveLeft: 0,
  };

  getInputs = (x: string): number => {
    const input = document.getElementById(x) as HTMLInputElement;
    let value = 0;

    if (input) {
      value = Number(input.value);
    }

    return value;
  };

  prevButton = () => {
    this.setState((state) => {
      const width = this.getInputs('itemWidth') + 10;
      let left = 0;
      const setLeft = state.moveLeft / (this.state.itemWidth + 10) * width;

      if (state.moveLeft <= this.getInputs('step') * -width) {
        left = setLeft + this.getInputs('step') * width;
      } else {
        left = 0;
      }

      return {
        animationDuration: this.getInputs('animationDuration'),
        frameSize: this.getInputs('frameSize'),
        itemWidth: this.getInputs('itemWidth'),
        moveLeft: left,
      };
    });
  };

  nextButton = () => {
    this.setState((state) => {
      const width = this.getInputs('itemWidth') + 10;
      const size = this.getInputs('frameSize') * width;
      let left = 0;
      const setLeft = state.moveLeft / (this.state.itemWidth + 10) * width;

      if (state.moveLeft
        <= -(10 * width) + size + (this.getInputs('step')) * width) {
        left = -(10 * width) + size;
      } else {
        left = setLeft - (this.getInputs('step')) * width;
      }

      return {
        animationDuration: this.getInputs('animationDuration'),
        frameSize: this.getInputs('frameSize'),
        itemWidth: this.getInputs('itemWidth'),
        moveLeft: left,
      };
    });
  };

  render() {
    const {
      images,
      animationDuration,
      frameSize,
      itemWidth,
      moveLeft,
    } = this.state;

    return (
      <>
        <div className="App">
          {/* eslint-disable-next-line */}
          <h1 data-cy="title">Carousel with {images.length} images</h1>

          <div className="Carousel">
            {moveLeft !== 0
              ? (
                <button
                  className="Carousel__arrow Carousel__arrow--left"
                  type="button"
                  style={{ marginTop: `${itemWidth / 2 - 15}px` }}
                  onClick={this.prevButton}
                >
                  Prev
                </button>
              ) : (
                <button
                  className="Carousel__arrow Carousel__arrow--left"
                  type="button"
                  onClick={this.prevButton}
                  style={{ opacity: '0' }}
                >
                  Prev
                </button>
              )}
            <Carousel
              images={images}
              animationDuration={animationDuration}
              frameSize={frameSize}
              itemWidth={itemWidth}
              moveLeft={moveLeft}
            />

            {moveLeft > -10 * (itemWidth + 10)
            + this.getInputs('step') * (itemWidth + 10) && (
              <button
                className="Carousel__arrow Carousel__arrow--right"
                type="button"
                data-cy="next"
                style={{ marginTop: `${itemWidth / 2 - 15}px` }}
                onClick={this.nextButton}
              >
                Next
              </button>
            )}
          </div>
        </div>

        <form action="" className="form">
          <label htmlFor="itemWidth">
            item width:
            <input
              type="number"
              id="itemWidth"
              name="itemWidth"
              defaultValue="130"
            />
          </label>

          <br />

          <label htmlFor="frameSize">frame size: </label>
          <input
            type="number"
            id="frameSize"
            name="frameSize"
            defaultValue="3"
          />

          <br />

          <label htmlFor="step">step: </label>
          <input
            type="number"
            id="step"
            name="step"
            defaultValue="3"
          />

          <br />

          <label htmlFor="animationDuration">animation duration(ms): </label>
          <input
            type="number"
            id="animationDuration"
            name="animationDuration"
            defaultValue="1000"
          />

          <br />
        </form>
      </>
    );
  }
}

export default App;
