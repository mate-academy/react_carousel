import { Component } from 'react';
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
  shift: number;
  isInfinite: boolean;
}

export class Carousel extends Component<Props, State> {
  state: State = {
    shift: 0,
    isInfinite: this.props.infinite,
  };

  handlePrevButton = () => {
    const {
      step,
      itemWidth,
      infinite,
    } = this.props;

    this.setState((prevState) => {
      const scrolledDist = prevState.shift - step * itemWidth;
      const newShift = infinite
        ? (scrolledDist % itemWidth)
        : Math.max(0, scrolledDist);

      return {
        shift: newShift,
      };
    });
  };

  handleNextButton = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const endOfScroll = (images.length - frameSize) * itemWidth;

    this.setState((prevState) => {
      const scrolledDist = prevState.shift + step * itemWidth;
      const newShift = infinite
        ? (scrolledDist % endOfScroll)
        : Math.min(scrolledDist, endOfScroll);

      return {
        shift: newShift,
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

    const { shift } = this.state;

    const carouselTransform = {
      transform: `translateX(${-shift}px)`,
      transition: `${animationDuration}ms`,
    };

    const containerWidth = { width: `${+itemWidth * +frameSize}px` };

    const imgWidth = {
      width: `${+itemWidth}px`,
    };
    const isDisabledPrev = shift <= 0 && !this.state.isInfinite;
    const isDisabledNext = shift >= (images.length - frameSize) * itemWidth
       && !this.state.isInfinite;

    return (
      <div className="Carousel">
        <div
          className="Carousel_container"
          style={containerWidth}
        >
          <ul
            className="Carousel_list"
            style={carouselTransform}
          >
            {images.map((image) => (
              <li
                className="Carousei_item"
                key={image}
              >
                <img
                  className="Carousel_img"
                  alt={`${image}`}
                  src={image}
                  style={imgWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Сarousel_buttons">
          <button
            type="button"
            className="Сarousel_button"
            onClick={this.handlePrevButton}
            disabled={isDisabledPrev}
          >
            Prev
          </button>

          <button
            type="button"
            className="Сarousel_button"
            onClick={this.handleNextButton}
            data-cy="next"
            disabled={isDisabledNext}
          >
            Next
          </button>
        </div>
      </div>

    );
  }
}
