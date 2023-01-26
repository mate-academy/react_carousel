import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

interface State {
  shift: number;
}

export class Carousel extends Component<Props, State> {
  state: State = {
    shift: 0,
  };

  handlePrevButton = () => {
    const {
      step,
      itemWidth,
    } = this.props;

    this.setState((prevState) => {
      const scrolledDist = prevState.shift - +step * +itemWidth;

      return (scrolledDist >= 0)
        ? { shift: scrolledDist }
        : { shift: 0 };
    });
  };

  handleNextButton = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
    } = this.props;

    this.setState((prevState) => {
      const scrolledDist = prevState.shift + +step * +itemWidth;
      const endOfScroll = (images.length - +frameSize) * +itemWidth;

      return (scrolledDist <= endOfScroll)
        ? { shift: scrolledDist }
        : { shift: endOfScroll };
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
            disabled={(shift <= 0)}
          >
            Prev
          </button>

          <button
            type="button"
            className="Сarousel_button"
            onClick={this.handleNextButton}
            data-cy="next"
            disabled={(shift >= (images.length - +frameSize) * +itemWidth)}
          >
            Next
          </button>
        </div>
      </div>

    );
  }
}
