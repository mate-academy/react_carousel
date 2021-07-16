import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';

class App extends React.Component {
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

  increaseFrameSize(maxElements) {
    this.setState(({ frameSize }) => {
      if (frameSize === maxElements) {
        return { frameSize };
      }

      return { frameSize: frameSize + 1 };
    });
  }

  decreaseFrameSize() {
    this.setState(({ frameSize }) => {
      if (frameSize === 1) {
        return { frameSize };
      }

      return { frameSize: frameSize - 1 };
    });
  }

  increaseImgSize(increment) {
    this.setState(({ itemWidth }) => {
      if (itemWidth > 300) {
        return { itemWidth };
      }

      return { itemWidth: itemWidth + increment };
    });
  }

  decreaseImgSize(decrement) {
    this.setState(({ itemWidth }) => {
      if (itemWidth < 11) {
        return { itemWidth };
      }

      return { itemWidth: itemWidth - decrement };
    });
  }

  increaseStepSize(maxElements) {
    this.setState(({ step }) => {
      if (step === maxElements) {
        return { step };
      }

      return { step: step + 1 };
    });
  }

  increaseAnimationDuration() {
    this.setState(({ animationDuration }) => {
      if (animationDuration > 9900) {
        return { animationDuration };
      }

      return { animationDuration: animationDuration + 100 };
    });
  }

  decreaseAnimationDuration() {
    this.setState(({ animationDuration }) => {
      if (animationDuration === 100) {
        return { animationDuration };
      }

      return { animationDuration: animationDuration - 100 };
    });
  }

  decreaseStepSize() {
    this.setState(({ step }) => {
      if (step === 1) {
        return { step };
      }

      return { step: step - 1 };
    });
  }

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
        <h1>Carousel with images</h1>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <form action="#" className="form">
          <h2>Increase frame size:</h2>
          <div className="form__increase-size-container">
            <button
              type="button"
              className="form__button"
              onClick={() => {
                this.decreaseFrameSize();
              }}
            >
              -1
            </button>
            <p>{frameSize}</p>
            <button
              type="button"
              className="form__button"
              onClick={() => {
                this.increaseFrameSize(images.length);
              }}
            >
              +1
            </button>
          </div>
          <h2>Increase image size:</h2>
          <div className="form__increase-size-container">
            <button
              type="button"
              className="form__button"
              onClick={() => this.decreaseImgSize(10)}
            >
              -10px
            </button>
            <button
              type="button"
              className="form__button"
              onClick={() => this.decreaseImgSize(1)}
            >
              -1px
            </button>
            <p>{`${itemWidth}px`}</p>
            <button
              type="button"
              className="form__button"
              onClick={() => this.increaseImgSize(1)}
            >
              +1px
            </button>
            <button
              type="button"
              className="form__button"
              onClick={() => this.increaseImgSize(10)}
            >
              +10px
            </button>
          </div>
          <h2>Number of images scrolled per click:</h2>
          <div className="form__increase-size-container">
            <button
              type="button"
              className="form__button"
              onClick={() => {
                this.decreaseStepSize();
              }}
            >
              -1
            </button>
            <p>{step}</p>
            <button
              type="button"
              className="form__button"
              onClick={() => {
                this.increaseStepSize(images.length);
              }}
            >
              +1
            </button>
          </div>
          <h2>Duration of animation:</h2>
          <div className="form__increase-size-container">
            <button
              type="button"
              className="form__button"
              onClick={() => {
                this.decreaseAnimationDuration();
              }}
            >
              -100
            </button>
            <p>{`${animationDuration}ms`}</p>
            <button
              type="button"
              className="form__button"
              onClick={() => {
                this.increaseAnimationDuration();
              }}
            >
              +100
            </button>
          </div>
          <button
            type="button"
            className="form__button"
            onClick={() => {
              this.setState({ infinite: !infinite });
            }}
          >
            Infinite:
            {' '}
            {infinite ? 'on' : 'off'}
          </button>
        </form>
      </div>
    );
  }
}

export default App;
