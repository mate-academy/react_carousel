import { Component } from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  currentFrame: number;
};

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currentFrame: 0,
  };

  intervalId = 0;

  nextStep = () => {
    const {
      step,
      frameSize,
      infinite,
      images,
    } = this.props;
    const count = images.length;
    const { currentFrame } = this.state;
    let nextFrame = currentFrame + step;

    if (currentFrame + frameSize === count && infinite) {
      nextFrame = 0;
    }

    if (count - nextFrame < frameSize) {
      nextFrame = count - frameSize;
    }

    this.setState({
      currentFrame: nextFrame,
    });
  };

  previousStep = () => {
    const {
      step,
      infinite,
      frameSize,
      images,
    } = this.props;
    const count = images.length;
    const { currentFrame } = this.state;
    let nextFrame = currentFrame - step;

    if (currentFrame === 0 && infinite) {
      nextFrame = count - frameSize;
    }

    if (nextFrame < 0) {
      nextFrame = 0;
    }

    this.setState({
      currentFrame: nextFrame,
    });
  };

  inVisibleArea = (index: number) => {
    const { currentFrame } = this.state;
    const { frameSize } = this.props;

    return index >= currentFrame
      && index < currentFrame + frameSize;
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;
    const { currentFrame } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: frameSize * itemWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-itemWidth * currentFrame}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((imageUrl, index) => (
            <li className="Carousel__item">
              <img
                className={
                  classNames('Carousel__img',
                    {
                      'Carousel__img--visible': this.inVisibleArea(index),
                    })
                }
                src={imageUrl}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={this.previousStep}
            className="Carousel__button"
          >
            {'<<'}
          </button>
          <button
            type="button"
            onClick={this.nextStep}
            data-cy="next"
            className="Carousel__button"
          >
            {'>>'}
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
