import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  position: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  handlePrevPosition = () => {
    const { position } = this.state;
    const {
      images, step, frameSize, infinite,
    } = this.props;
    const prevPosition = position + step;
    const maxPosition = images.length - frameSize;

    if (position === 0 && infinite) {
      return this.setState({ position: -maxPosition });
    }

    return (
      prevPosition > 0
        ? this.setState({ position: 0 })
        : this.setState({ position: prevPosition })
    );
  };

  handleNextPosition = () => {
    const { position } = this.state;
    const {
      images, step, frameSize, infinite,
    } = this.props;
    const nextPosition = position - step;
    const maxPosition = images.length - frameSize;

    if (position === -maxPosition && infinite) {
      return this.setState({ position: 0 });
    }

    return (
      -nextPosition > maxPosition
        ? this.setState({ position: -maxPosition })
        : this.setState({ position: nextPosition })
    );
  };

  render(): React.ReactNode {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    return (
      <div
        className="Carousel"
        style={{ width: itemWidth * frameSize }}
      >
        <div className="container">
          <ul
            className="container__list"
            style={{
              transition: `width ${animationDuration}ms`,
              width: `${frameSize * itemWidth}px`,
            }}
          >
            {images.map((image) => (
              <li
                className="item"
                key={image}
                style={{
                  transform: `translateX(${position * itemWidth}px)`,
                  transition: `transform ${animationDuration}ms`,
                }}
              >
                <img
                  src={image}
                  alt="img"
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <button
            type="button"
            onClick={() => this.handlePrevPosition()}
            className="button button__prev"
            disabled={position >= 0 && !infinite}
          >
            ☚
          </button>
          <button
            type="button"
            onClick={() => this.handleNextPosition()}
            className="button button__next"
            disabled={-position >= images.length - frameSize && !infinite}
          >
            ☛
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
