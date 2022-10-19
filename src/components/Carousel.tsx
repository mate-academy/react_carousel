import { Component } from 'react';
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
  offset: number;
};

export class Carousel extends Component<Props, State> {
  state = {
    offset: 0,
  };

  handlePrevClick = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const hiddenImagesSize = (images.length - frameSize) * itemWidth;

    this.setState((state) => ({
      offset: Math.min(state.offset + itemWidth * step, 0),
    }));

    if (this.state.offset === 0 && infinite) {
      this.setState({ offset: -hiddenImagesSize });
    }
  };

  handleNextClick = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const hiddenImagesSize = (images.length - frameSize) * itemWidth;

    this.setState((state) => ({
      offset: Math.max(state.offset - itemWidth * step, -hiddenImagesSize),
    }));

    if (this.state.offset === -hiddenImagesSize && infinite) {
      this.setState({ offset: 0 });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
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

        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={this.handlePrevClick}
            disabled={offset === 0 && !infinite}
          >
            Prev
          </button>

          <button
            data-cy="next"
            type="button"
            onClick={this.handleNextClick}
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
