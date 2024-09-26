import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  position: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  handleNextClick = (
    position: number,
    maxPosition: number,
    stepSize: number,
    isLastCheck: boolean,
    infinite: boolean,
  ) => {
    if (isLastCheck) {
      this.setState({
        position: maxPosition,
      });
    } else {
      this.setState(state => ({
        position: state.position - stepSize,
      }));
    }

    if (infinite && position === maxPosition) {
      this.setState({
        position: 0,
      });
    }
  };

  handlePrevClick = (
    position: number,
    maxPosition: number,
    stepSize: number,
    infinite: boolean,
  ) => {
    if (this.state.position + (stepSize) >= 0) {
      this.setState({
        position: 0,
      });
    } else {
      this.setState(state => ({
        position: state.position + (stepSize),
      }));
    }

    if (infinite && position + stepSize === stepSize) {
      this.setState({
        position: maxPosition,
      });
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const maxPosition = -itemWidth * (images.length - frameSize);

    const stepSize = step * itemWidth;

    const isLastCheck = position - (step * itemWidth) <= maxPosition;

    return (
      <div
        className="Carousel Carousel--margin"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
        >
          {images.map((image, i) => (
            <li
              key={image}
              className="Carousel__list-item"
              style={{
                transform: `translateX(${position}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={`Emoji-${i + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__btn-container">
          <button
            className="Carousel__btn"
            type="button"
            disabled={!infinite && position === 0}
            onClick={() => {
              this.handlePrevClick(position, maxPosition, stepSize, infinite);
            }}
          >
            Prev
          </button>

          <button
            className="Carousel__btn"
            type="button"
            disabled={!infinite && position === maxPosition}
            data-cy="next"
            onClick={() => {
              this.handleNextClick(
                position, maxPosition, stepSize, isLastCheck, infinite,
              );
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
