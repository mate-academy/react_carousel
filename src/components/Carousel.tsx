import React from "react";
import "bulma";
import "./Carousel.scss";

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
  currentFrameSize: number;
}

class Carousel extends React.Component<Props, State> {
  state: State = {
    position: 0,
    currentFrameSize: 0,
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

    this.setState({
      position: nextPosition,
      currentFrameSize: frameSize,
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      // eslint-disable-next-line
    } = this.props;
    const { position, currentFrameSize } = this.state;
    const isPrevDisabled = position <= 0 && !infinite;
    const isNextDisabled = position >= images.length - frameSize && !infinite;

    if (frameSize > currentFrameSize) {
      this.setState({
        position: images.length - frameSize,
        currentFrameSize: frameSize,
      });
    }

    return (
      <>
        <div
          className="Carousel"
          style={{
            width: `${frameSize * itemWidth + 20}px`,
            transition: `${animationDuration}ms`,
          }}
        >
          <ul className="Carousel__list">
            {images.map((image) => (
              <li className="Carousel__item" key={`${image.slice(-5, -4)}`}>
                <img
                  src={`${image}`}
                  alt={`${image.slice(-5, -4)}`}
                  width={itemWidth}
                  style={{
                    transform: `translateX(${-position * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                    minWidth: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="button is-warning is-light is-rounded"
            disabled={isPrevDisabled}
            onClick={this.handlePrevButton}
          >
            &larr;
          </button>

          <button
            type="button"
            className="button is-warning is-light is-rounded"
            disabled={isNextDisabled}
            onClick={this.handleNextButton}
            data-cy="next"
          >
            &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;
