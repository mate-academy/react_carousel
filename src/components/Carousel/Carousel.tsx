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

  handleNextButton = (
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

  handlePrevButton = (
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

    let { position } = this.state;
    const maxPosition = -itemWidth * (images.length - frameSize);
    const stepSize = step * itemWidth;
    const isLastCheck = position - (step * itemWidth) <= maxPosition;

    if (+position % itemWidth !== 0) {
      const difference = +position % itemWidth;

      position -= difference;

      if (position < maxPosition) {
        position = maxPosition;
      }
    }

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul className="Carousel__list">
          {images.map(image => {
            const startIndex = image.lastIndexOf('/') + 1;
            const endIndex = image.lastIndexOf('.');
            const id = image.slice(startIndex, endIndex);

            return (
              <li
                key={id}
                style={{
                  transform: `translateX(${position}px)`,
                  transition: `transform ${animationDuration}ms`,
                }}
              >
                <img
                  src={image}
                  alt={id}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            disabled={!infinite && position === 0}
            onClick={() => {
              this.handlePrevButton(position, maxPosition, stepSize, infinite);
            }}
          >
            Prev
          </button>
          <button
            data-cy="next"
            type="button"
            disabled={!infinite && position === maxPosition}
            onClick={() => {
              this.handleNextButton(
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
