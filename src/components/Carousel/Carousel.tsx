import { Component } from 'react';
import './Carousel.scss';
import { createId } from '../../utils/uuid-creator';

type CarouselProps = {
  images: string[],
  step: string,
  frameSize: string,
  itemWidth: string,
  animationDuration: string,
  infinite: boolean,
};

type State = {
  index: number;
};

export class Carousel extends Component<CarouselProps, State> {
  state: State = {
    index: 0,
  };

  componentDidUpdate(prevProps: CarouselProps) {
    if (prevProps.itemWidth !== this.props.itemWidth
      && this.state.index !== 0) {
      this.setState({ index: 0 });
    }
  }

  handleButtonClick = (direction: number) => {
    this.setState((prevState) => {
      const newIndex = prevState.index
        + (direction
          * parseInt(this.props.step, 10)
          * parseInt(this.props.itemWidth, 10));

      if (newIndex > 0
        || -newIndex
        >= (this.props.images.length
          * parseInt(this.props.itemWidth, 10))) {
        if (this.props.infinite && direction === -1) {
          return {
            index: 0,
          };
        }

        return null;
      }

      return {
        index: newIndex,
      };
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { index } = this.state;

    const { handleButtonClick } = this;

    return (
      <div className="carousel">
        <div
          className="carousel__container"
          style={{
            width: `${parseInt(frameSize, 10)
            * parseInt(itemWidth, 10)}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(${index}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image) => (
              <li
                className="carousel__item"
                key={createId()}
                style={{ width: `${itemWidth}px` }}
              >
                <img
                  src={image}
                  alt="Selected smile"
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="carousel__button-wrapper">
          <button
            className="carousel__button"
            type="button"
            onClick={() => handleButtonClick(1)}
          >
            Prev
          </button>

          <button
            className="carousel__button"
            data-cy="next"
            type="button"
            onClick={() => handleButtonClick(-1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
