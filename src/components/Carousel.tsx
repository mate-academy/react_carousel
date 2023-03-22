import { Component } from 'react';
import classNames from 'classnames';
import './Carousel.scss';
import { getNextFrame, getPreviousFrame } from '../helpers';

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
  hasPrevious: boolean,
};

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currentFrame: 0,
    inTransition: false,
    hasNext: true,
    hasPrevious: false,
  };

  timeoutId = 0;

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  handleNext = () => {
    const {
      step,
      frameSize,
      infinite,
      images,
    } = this.props;
    const count = images.length;
    const { currentFrame, hasPrevious } = this.state;

    const nextFrame = getNextFrame(
      currentFrame,
      count,
      frameSize,
      step,
      infinite,
    );

    const hasNextFrame = getNextFrame(
      nextFrame,
      count,
      frameSize,
      step,
      infinite,
    ) !== nextFrame;

    if (!hasNextFrame) {
      this.setState({
        hasNext: false,
      });
    }

    if (!hasPrevious) {
      this.setState({
        hasPrevious: true,
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

    const previousFrame = getPreviousFrame(
      currentFrame,
      count,
      frameSize,
      step,
      infinite,
    );

    const hasPreviousFrame = getPreviousFrame(
      previousFrame,
      count,
      frameSize,
      step,
      infinite,
    ) !== previousFrame;

    if (!hasPreviousFrame) {
      this.setState({
        hasPrevious: false,
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

    this.timeoutId = window.setTimeout(() => {
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
      hasPrevious,
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
            disabled={inTransition || !hasPrevious}
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
