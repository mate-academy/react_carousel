import React from 'react';
import './Carousel.scss';
import ScrollingFrame from '../ScrollingFrame/ScrollingFrame';
import { carouselShape } from '../../types';

class Carousel extends React.Component {
  state = {
    images: this.props.images,
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
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
      <>
        <ScrollingFrame
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <div className="tools">
          <h2>Increase frame size:</h2>
          <div className="tools__increase-size-container">
            <button
              type="button"
              className="tools__button"
              onClick={() => {
                this.decreaseFrameSize();
              }}
            >
              -1
            </button>
            <p>{frameSize}</p>
            <button
              type="button"
              className="tools__button"
              onClick={() => {
                this.increaseFrameSize(images.length);
              }}
            >
              +1
            </button>
          </div>
          <h2>Increase image size:</h2>
          <div className="tools__increase-size-container">
            <button
              type="button"
              className="tools__button"
              onClick={() => this.decreaseImgSize(10)}
            >
              -10px
            </button>
            <button
              type="button"
              className="tools__button"
              onClick={() => this.decreaseImgSize(1)}
            >
              -1px
            </button>
            <p>{`${itemWidth}px`}</p>
            <button
              type="button"
              className="tools__button"
              onClick={() => this.increaseImgSize(1)}
            >
              +1px
            </button>
            <button
              type="button"
              className="tools__button"
              onClick={() => this.increaseImgSize(10)}
            >
              +10px
            </button>
          </div>
          <h2>Number of images scrolled per click:</h2>
          <div className="tools__increase-size-container">
            <button
              type="button"
              className="tools__button"
              onClick={() => {
                this.decreaseStepSize();
              }}
            >
              -1
            </button>
            <p>{step}</p>
            <button
              type="button"
              className="tools__button"
              onClick={() => {
                this.increaseStepSize(images.length);
              }}
            >
              +1
            </button>
          </div>
          <h2>Duration of animation:</h2>
          <div className="tools__increase-size-container">
            <button
              type="button"
              className="tools__button"
              onClick={() => {
                this.decreaseAnimationDuration();
              }}
            >
              -100
            </button>
            <p>{`${animationDuration}ms`}</p>
            <button
              type="button"
              className="tools__button"
              onClick={() => {
                this.increaseAnimationDuration();
              }}
            >
              +100
            </button>
          </div>
          <button
            type="button"
            className="tools__button"
            onClick={() => {
              this.setState({ infinite: !infinite });
            }}
          >
            Infinite:
            {' '}
            {infinite ? 'on' : 'off'}
          </button>
        </div>
      </>
    );
  }
}

Carousel.propTypes = carouselShape;

export default Carousel;
