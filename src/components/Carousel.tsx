import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map(image => (
            <li
              key={image}
            >
              <img
                style={{
                  transform: `translateX(${-position * itemWidth}px)`,
                  transition: `${animationDuration}ms`,
                }}
                src={image}
                alt={`${images.indexOf(image)}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={isPrevDisabled}
            onClick={this.handlePrevButton}
          >
            &larr; Prev
          </button>

          <button
            data-cy="next"
            type="button"
            className="Carousel__button"
            disabled={isNextDisabled}
            onClick={this.handleNextButton}
          >
            Next &rarr;
          </button>
        </div>

      </div>
    );
  }
}

export default Carousel;
