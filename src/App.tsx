import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  animationDuration: number;
  frameSize: number;
  itemWidth: number;
  moveLeft: number;
  step: number;
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
    step: 3,
  };

  prevButton = () => {
    this.setState((prevstate) => {
      const width = prevstate.itemWidth + 10;
      let left = 0;
      // eslint-disable-next-line no-mixed-operators
      const setLeft = prevstate.moveLeft / (prevstate.itemWidth + 10) * width;

      if (prevstate.moveLeft <= prevstate.step * -width) {
        left = setLeft + prevstate.step * width;
      } else {
        left = 0;
      }

      return {
        moveLeft: left,
      };
    });
  };

  nextButton = () => {
    this.setState((prevstate) => {
      const width = prevstate.itemWidth + 10;
      const size = prevstate.frameSize * width;
      let left = 0;
      // eslint-disable-next-line no-mixed-operators
      const setLeft = prevstate.moveLeft / (width) * width;

      if (prevstate.moveLeft
        <= -(10 * width) + size + (prevstate.step) * width) {
        left = -(10 * width) + size;
      } else {
        left = setLeft - (prevstate.step) * width;
      }

      return {
        moveLeft: left,
      };
    });
  };

  changeItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevstate) => {
      let width = Number(e.target.value);

      if (Number(e.target.value) < 0) {
        width = 0;
      }

      const left
      // eslint-disable-next-line no-mixed-operators
      = prevstate.moveLeft / (prevstate.itemWidth + 10) * (width + 10);

      return {
        itemWidth: width,
        moveLeft: left,
      };
    });
  };

  changeStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) {
      this.setState({
        step: 1,
      });
    } else if ((Number(e.target.value) > 9)) {
      this.setState({
        step: 9,
      });
    } else {
      this.setState({
        step: Number(e.target.value),
      });
    }
  };

  changeFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const steps = -this.state.moveLeft / (this.state.itemWidth + 10);

    if (Number(e.target.value) < 1) {
      this.setState({
        frameSize: 1,
      });
    } else if ((Number(e.target.value) > 10 - steps)) {
      this.setState({
        frameSize: 10 - steps,
      });
    } else {
      this.setState({
        frameSize: Number(e.target.value),
      });
    }
  };

  render() {
    const {
      images,
      animationDuration,
      frameSize,
      itemWidth,
      moveLeft,
      step,
    } = this.state;

    const isButtonNext = moveLeft > -10 * (itemWidth + 10)
    + frameSize * (itemWidth + 10);

    return (
      <>
        <div className="App">
          {/* eslint-disable-next-line */}
          <h1 data-cy="title">Carousel with {images.length} images</h1>

          <div className="carousel">
            <button
              className="carousel__arrow carousel__arrow--left"
              type="button"
              style={moveLeft !== 0
                ? { marginTop: `${itemWidth / 2 - 15}px` }
                : { opacity: '0' }}
              onClick={this.prevButton}
            >
              Prev
            </button>
            <Carousel
              images={images}
              animationDuration={animationDuration}
              frameSize={frameSize}
              itemWidth={itemWidth}
              moveLeft={moveLeft}
            />

            {isButtonNext && (
              <button
                className="carousel__arrow carousel__arrow--right"
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
          <div className="div">
            <label htmlFor="itemWidth">
              item width:
              <input
                type="number"
                id="itemWidth"
                name="itemWidth"
                className="input"
                value={itemWidth}
                onChange={
                  (
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => this.changeItemWidth(e)
                }
              />
            </label>
          </div>

          <div className="div">
            <label htmlFor="frameSize">frame size: </label>
            <input
              type="number"
              id="frameSize"
              name="frameSize"
              className="input"
              value={frameSize}
              onChange={
                (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => this.changeFrameSize(e)
              }
            />
          </div>

          <div className="div">
            <label htmlFor="step">step: </label>
            <input
              type="number"
              id="step"
              name="step"
              className="input"
              value={step}
              onChange={
                (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => this.changeStep(e)
              }
            />
          </div>

          <div className="div">
            <label htmlFor="animationDuration">animation duration(ms): </label>
            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              className="input"
              value={animationDuration}
              onChange={(event) => {
                this.setState({
                  animationDuration: Number(event.target.value),
                });
              }}
            />
          </div>
        </form>
      </>
    );
  }
}

export default App;
