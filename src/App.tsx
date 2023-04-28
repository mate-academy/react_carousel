import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type Props = {};

interface State {
  images: string[];
  currentIndex: number;
  frameSize: number;
  itemWidth: number,
  title: number,
  infinite: boolean;
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

    title: 0,

    frameSize: 390,

    itemWidth: 130,

    infinite: false,
  };

  timerID = 0;

  componentDidMount(): void {
    this.setState((state) => ({
      currentIndex: state.frameSize / state.itemWidth,
    }));

    this.setState((state) => ({
      title: state.frameSize / state.itemWidth,
    }));

    this.timerID = window.setInterval(() => {
      this.setState((state) => ({
        infinite: !state.infinite,
      }));
    }, 10000);
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
        currentIndex: state.frameSize / state.itemWidth,
      }));
    }

    return prevProps;
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  buttonPrev = () => {
    if (this.state.currentIndex > this.state.frameSize / this.state.itemWidth) {
      this.setState((state) => ({
        currentIndex: state.currentIndex
        - (state.frameSize / state.itemWidth),
      }));
    }
  };

  buttonNext = () => {
    if (this.state.currentIndex < 10) {
      this.setState((state) => ({
        currentIndex: state.currentIndex + (state.frameSize / state.itemWidth),
      }));
    }
  };

  render() {
    let modifiedArr = this.state.images.slice(
      this.state.currentIndex - (this.state.frameSize / this.state.itemWidth),
      this.state.currentIndex,
    );

    if (modifiedArr.length !== this.state.frameSize / this.state.itemWidth) {
      modifiedArr = this.state.images.slice(7, 10);
    }

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {this.state.title} images</h1>
        <Carousel
          arrOfCarousel={modifiedArr}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
        />

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
          className="Carousel__button"
          onClick={() => {
            this.buttonNext();
          }}
          disabled={this.state.currentIndex >= 10}
        >
          Next

        </button>
        {this.state.currentIndex}
      </div>
    );
  }
}

export default App;
