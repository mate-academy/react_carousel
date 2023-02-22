import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
};

type State = {
  count: number,
};

class Carousel extends Component<Props, State> {
  state = {
    count: 0,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinity,
      step,
    } = this.props;
    const { count } = this.state;
    const lastSlide = (images.length - frameSize) * -itemWidth;
    const isDisNextSlide = count <= lastSlide;
    const isDisPrevSlide = count === 0;

    const nextSlide = () => {
      const start = count - (itemWidth * step);

      this.setState({
        count: count <= lastSlide
          ? 0
          : Math.max(start, lastSlide),
      });
    };

    const prevSlide = () => {
      const start = count + (itemWidth * step);

      this.setState({
        count: count >= 0
          ? lastSlide
          : Math.min(start, 0),
      });
    };

    return (
      <div
        className="Carousel"
        style={{ width: frameSize * itemWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${count}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index}`}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>

        <button
          className="button button__prev"
          type="button"
          data-cy="prev"
          onClick={prevSlide}
          disabled={!infinity && isDisPrevSlide}
        >
          &#8592;
        </button>
        <button
          className="button button__next"
          type="button"
          data-cy="next"
          onClick={nextSlide}
          disabled={!infinity && isDisNextSlide}
        >
          &#8594;
        </button>
      </div>
    );
  }
}

export default Carousel;
