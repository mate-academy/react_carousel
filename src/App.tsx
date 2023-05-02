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
  wrongFrameSize: boolean,
  wrongItemSize: boolean,
  wrongStep: boolean,
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

    wrongFrameSize: false,

    wrongItemSize: false,

    wrongStep: false,
  };

  componentDidMount(): void {
    if (this.state.itemWidth * this.state.step > this.state.frameSize) {
      throw new Error('please Enter valid frame size or item width');
    }
  }

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
    if (+event.target.value >= 100 && +event.target.value <= 800) {
      this.setState({
        frameSize: +event.target.value,
        wrongFrameSize: false,
      });
    } else {
      this.setState({
        wrongFrameSize: true,
      });
    }
  };

  setItemSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= 20 && +event.target.value <= 150) {
      this.setState({
        itemWidth: +event.target.value,
        wrongItemSize: false,
      });
    } else {
      this.setState({
        wrongItemSize: true,
      });
    }
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= 1 && +event.target.value <= 5) {
      this.setState({
        step: +event.target.value,
        currentIndex: +event.target.value,
        wrongStep: false,
      });
    } else {
      this.setState({
        wrongStep: true,
      });
    }
  };

  setAnimationTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= 10) {
      this.setState({
        animationDuration: event.target.value,
      });
    }
  };

  render() {
    const copy = this.state.images;
    let modifiedArr = copy;

    if (this.state.frameSize / this.state.itemWidth >= this.state.step) {
      modifiedArr = copy.slice(
        this.state.currentIndex
        - this.state.step,
        this.state.currentIndex,
      );
    } else {
      modifiedArr = [];
    }

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

          <span>
            {this.state.wrongFrameSize && 'Please Enter valid value'}
          </span>

          <input
            type="number"
            placeholder={`${this.state.itemWidth.toString()}px`}
            className="Input__fields"
            onChange={this.setItemSize}
            min="20"
            max="150"
          />

          <span>
            {this.state.wrongItemSize && 'Please Enter valid value'}
          </span>

          <input
            type="number"
            placeholder={`${this.state.step.toString()}bit`}
            className="Input__fields"
            onChange={this.setStep}
            min="1"
            max="5"
          />

          <span>
            {this.state.wrongStep && 'Please Enter valid value'}
          </span>

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
