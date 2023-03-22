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
  currentFrame: number,
  inTransition: boolean,
  hasNext: boolean,
  hasPreviouus: boolean,
};

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currentFrame: 0,
    inTransition: false,
    hasNext: true,
    hasPreviouus: false,
  };

  intervalId = 0;

  handleNext = () => {
    const {
      step,
      frameSize,
      infinite,
      images,
    } = this.props;
    const count = images.length;
    const { currentFrame, hasPreviouus } = this.state;

    const getNextFrame = (current: number) => {
      let next = current + step;

      if (current + frameSize === count && infinite) {
        next = 0;
      }

      if (count - next < frameSize) {
        next = count - frameSize;
      }

      return next;
    };

    const nextFrame = getNextFrame(currentFrame);

    const hasNextFrame = getNextFrame(nextFrame) !== nextFrame;

    if (!hasNextFrame) {
      this.setState({
        hasNext: false,
      });
    }

    if (!hasPreviouus) {
      this.setState({
        hasPreviouus: true,
      });
    }

    this.setCurrentFrame(nextFrame);
  };

  handlePrevious = () => {
    const {
      step,
      infinite,
      frameSize,
      images,
    } = this.props;
    const count = images.length;
    const { currentFrame, hasNext } = this.state;

    const getPreviousFrame = (current: number) => {
      let previous = current - step;

      if (current === 0 && infinite) {
        previous = count - frameSize;
      }

      if (previous < 0) {
        previous = 0;
      }

      return previous;
    };

    const previousFrame = getPreviousFrame(currentFrame);
    const hasPreviousFrame = previousFrame !== getPreviousFrame(previousFrame);

    if (!hasPreviousFrame) {
      this.setState({
        hasPreviouus: false,
      });
    }

    if (!hasNext) {
      this.setState({
        hasNext: true,
      });
    }

    this.setCurrentFrame(previousFrame);
  };

  setCurrentFrame = (nextFrame: number) => {
    this.setState({
      inTransition: true,
      currentFrame: nextFrame,
    });

    setTimeout(() => {
      this.setState({
        inTransition: false,
      });
    }, this.props.animationDuration);
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
    const {
      currentFrame,
      inTransition,
      hasNext,
      hasPreviouus,
    } = this.state;

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
            onClick={this.handlePrevious}
            className="Carousel__button"
            disabled={inTransition || !hasPreviouus}
          >
            {'<<'}
          </button>

          <button
            type="button"
            onClick={this.handleNext}
            data-cy="next"
            className="Carousel__button"
            disabled={inTransition || !hasNext}
          >
            {'>>'}
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
