import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type Props = {};

interface State {
  images: string[];
  currentIndex: number;
  containerWidth: number;
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

    containerWidth: 390,
  };

  componentDidMount(): void {
    this.setState((state) => ({
      currentIndex: state.containerWidth / 130,
    }));
  }

  buttonPrev = () => {
    if (this.state.currentIndex > this.state.containerWidth / 130) {
      this.setState((state) => ({
        currentIndex: state.currentIndex - (state.containerWidth / 130),
      }));
    }
  };

  buttonNext = () => {
    if (this.state.currentIndex < 10) {
      this.setState((state) => ({
        currentIndex: state.currentIndex + (state.containerWidth / 130),
      }));
    }
  };

  render() {
    let modifiedArr = this.state.images.slice(
      this.state.currentIndex - (this.state.containerWidth / 130),
      this.state.currentIndex,
    );

    if (modifiedArr.length !== this.state.containerWidth / 130) {
      modifiedArr = this.state.images.slice(7, 10);
    }

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {this.state.images.length} images</h1>
        <div style={{ width: `${this.state.containerWidth}px` }}>
          <Carousel arrOfCarousel={modifiedArr} />
        </div>

        <button
          type="button"
          onClick={() => {
            this.buttonPrev();
          }}
        >
          Prev

        </button>
        <button
          type="button"
          onClick={() => {
            this.buttonNext();
          }}
        >
          Next

        </button>
      </div>
    );
  }
}

export default App;
