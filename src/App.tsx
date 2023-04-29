import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type Props = {};

interface State {
  images: string[];
  currentIndex: number;
  frameSize: number;
  itemWidth: number,
  title: number,
  infinite: boolean,
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

    currentIndex: 0,

    title: 3,

    frameSize: 390,

    itemWidth: 130,

    step: 3,

    infinite: false,

    animationDuration: '1',
  };

  timerID = 0;

  componentDidMount(): void {
    this.setState((state) => ({
      currentIndex: Math.floor(state.frameSize / state.itemWidth),
    }));

    this.timerID = window.setInterval(() => {
      this.setState((state) => ({
        infinite: !state.infinite,
      }));
    }, 100000);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.infinite === true
      && this.state.infinite !== prevState.infinite
      && this.state.currentIndex < this.state.images.length) {
      this.buttonNext();
    }

    if (this.state.infinite === true
      && this.state.infinite !== prevState.infinite
      && this.state.currentIndex >= this.state.images.length) {
      this.setState((state) => ({
        currentIndex: state.title,
      }));
    }

    return prevProps;
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  buttonPrev = () => {
    if (this.state.currentIndex
      > Math.floor(this.state.frameSize / this.state.itemWidth)) {
      this.setState((state) => ({
        currentIndex: state.currentIndex - state.title,
      }));
    }
  };

  buttonNext = () => {
    if (this.state.currentIndex < 10) {
      this.setState((state) => ({
        currentIndex: state.currentIndex + state.title,
      }));
    }
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: +event.target.value,
    });

    this.setState((state) => ({
      title: Math.floor(state.frameSize / state.itemWidth),
    }));
  };

  setItemSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: +event.target.value,
    });

    if (this.state.step === 0) {
      this.setState((state) => ({
        title: Math.floor(state.frameSize / state.itemWidth),
      }));
    }
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: +event.target.value,
    });
  };

  setAnimationTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: event.target.value,
    });
  };

  render() {
    const copy = this.state.images;

    let modifiedArr = copy.slice(
      this.state.currentIndex
      - this.state.title,
      this.state.currentIndex,
    );

    if (modifiedArr.length
       !== this.state.title
       && this.state.currentIndex > 5) {
      modifiedArr = copy.slice(
        10 - this.state.title,
      );
    }

    if (modifiedArr.length
        !== this.state.title
        && this.state.currentIndex < 5) {
      modifiedArr = copy.slice(
        0, 0 + this.state.title,
      );
    }

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {this.state.title} images</h1>
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
              disabled={this.state.currentIndex >= 10}
              data-cy="Next"
            >
              Next

            </button>
          </div>
          {this.state.currentIndex}

          <input
            type="text"
            placeholder="Framesize"
            className="Input__fields"
            onChange={this.setFrameSize}
          />

          <input
            type="text"
            placeholder="Itemsize"
            className="Input__fields"
            onChange={this.setItemSize}
          />

          <input
            type="text"
            placeholder="Stepsize"
            className="Input__fields"
            onChange={this.setStep}
          />

          <input
            type="text"
            placeholder="AnimationDuration"
            className="Input__fields"
            onChange={this.setAnimationTime}
          />
        </div>
      </div>
    );
  }
}

export default App;
