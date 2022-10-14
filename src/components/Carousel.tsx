import React from 'react';
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
  offset: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    offset: 0,
  };

  handleLeftArrowClick = () => {
    const {
      itemWidth,
      step,
      images,
      frameSize,
      infinite,
    } = this.props;
    const sizeOfHiddenImages = (images.length - frameSize) * itemWidth;

    this.setState((state) => ({
      offset: Math.min(state.offset + itemWidth * step, 0),
    }));

    if (this.state.offset === 0 && infinite) {
      this.setState({ offset: -sizeOfHiddenImages });
    }
  };

  handleRightArrowClick = () => {
    const {
      itemWidth,
      step,
      images,
      frameSize,
      infinite,
    } = this.props;
    const sizeOfHiddenImages = (images.length - frameSize) * itemWidth;

    this.setState((state) => ({
      offset: Math.max(state.offset - itemWidth * step, -sizeOfHiddenImages),
    }));

    if (this.state.offset === -sizeOfHiddenImages && infinite) {
      this.setState({ offset: 0 });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      animationDuration,
      frameSize,
      infinite,
    } = this.props;

    const { offset } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              style={{
                transform: `translateX(${offset}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={`${index + 1}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
        <div
          className="Carousel__buttons"
        >
          <button
            type="button"
            onClick={this.handleLeftArrowClick}
            disabled={
              offset === 0 && !infinite
            }
          >
            Prev
          </button>

          <button
            type="button"
            data-cy="next"
            onClick={this.handleRightArrowClick}
            disabled={
              offset === -(images.length - frameSize) * itemWidth && !infinite
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
