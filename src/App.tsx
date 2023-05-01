import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type Props = {};

interface State {
  images: string[];
  currentIndex: number;
  frameSize: number;
  itemWidth: number,
  step: number,
  animationDuration: string,
}

class App extends React.Component<Props, State> {
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

    currentIndex: 3,

    frameSize: 390,

    itemWidth: 130,

    step: 3,

    animationDuration: '1',
  };

  buttonPrev = () => {
    if (this.state.currentIndex
      > Math.floor(this.state.frameSize / this.state.itemWidth)) {
      this.setState((state) => ({
        currentIndex: state.currentIndex - state.step,
      }));
    }
  };

  buttonNext = () => {
    if (this.state.currentIndex < 10) {
      this.setState((state) => ({
        currentIndex: state.currentIndex + state.step,
      }));
    }

    if (this.state.currentIndex >= 10) {
      this.setState((state) => ({
        currentIndex: state.step,
      }));
    }
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      this.setState({
        frameSize: +event.target.value,
      });
    }
  };

  setItemSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      this.setState({
        itemWidth: +event.target.value,
      });
    }
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      this.setState({
        step: +event.target.value,
        currentIndex: +event.target.value,
      });
    }
  };

  setAnimationTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      this.setState({
        animationDuration: event.target.value,
      });
    }
  };

  render() {
    const copy = this.state.images;

    const modifiedArr = copy.slice(
      this.state.currentIndex
      - this.state.step,
      this.state.currentIndex,
    );

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {this.state.step} images</h1>
        <Carousel
          arrOfCarousel={modifiedArr}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
        />

        <div className="Input">
          <div>
            <button
              type="button"
              className="Carousel__button Carousel__button1"
              onClick={() => {
                this.buttonPrev();
              }}
              disabled={this.state.currentIndex
            <= this.state.frameSize / this.state.itemWidth}
            >
              Prev

            </button>
            <button
              type="button"
              className="Carousel__button Carousel__button1"
              onClick={() => {
                this.buttonNext();
              }}
              data-cy="Next"
              disabled={this.state.currentIndex
                >= 10}
            >
              Next

            </button>
          </div>
          <input
            type="number"
            placeholder={`${this.state.frameSize.toString()}px`}
            className="Input__fields"
            onChange={this.setFrameSize}
          />

          <input
            type="number"
            placeholder={`${this.state.itemWidth.toString()}px`}
            className="Input__fields"
            onChange={this.setItemSize}
          />

          <input
            type="number"
            placeholder={`${this.state.step.toString()}bit`}
            className="Input__fields"
            onChange={this.setStep}
          />

          <input
            type="number"
            placeholder={`${this.state.animationDuration.toString()}s`}
            className="Input__fields"
            onChange={this.setAnimationTime}
          />
        </div>
      </div>
    );
  }
}

export default App;
