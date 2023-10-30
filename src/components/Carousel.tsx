/* eslint-disable react/no-array-index-key */
import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

interface State {
  position: number;
}

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  handlePrevButton = () => {
    const { images, step, frameSize } = this.props;
    const { position } = this.state;
    const lastPosition = images.length - frameSize;
    let prevPosition = position - step;

    if (position === 0) {
      prevPosition = lastPosition;
    }

    if (prevPosition < 0) {
      prevPosition = 0;
    }

    this.setState({ position: prevPosition });
  };

  handleNextButton = () => {
    const { images, step, frameSize } = this.props;
    const { position } = this.state;
    const lastPosition = images.length - frameSize;
    let nextPosition = position + step;

    if (position === lastPosition) {
      nextPosition = 0;
    }

    if (nextPosition > lastPosition) {
      nextPosition = lastPosition;
    }

    this.setState({ position: nextPosition });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;
    const isPrevDisabled = (position <= 0) && !infinite;
    const isNextDisabled = (position >= images.length - frameSize) && !infinite;
    const wi = frameSize * itemWidth;

    return (
      <div
        className="Carousel"
        style={{
          width: `${wi}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li key={index}>
              <img
                style={{
                  transform: `translateX(${-position * itemWidth}px)`,
                  transition: `transform ${animationDuration}ms ease-in-out`,
                }}
                src={image}
                alt={`${index}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            data-cy="prev"
            className="Carousel__button"
            disabled={isPrevDisabled}
            onClick={this.handlePrevButton}
          >
            Prev
          </button>

          <button
            type="button"
            data-cy="next"
            className="Carousel__button"
            disabled={isNextDisabled}
            onClick={this.handleNextButton}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
