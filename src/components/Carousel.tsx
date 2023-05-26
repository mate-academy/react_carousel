import { Component } from 'react';
import './Carousel.scss';

type State = {
  currentItemIndex: number,
};

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

class Carousel extends Component<Props, State> {
  state = {
    currentItemIndex: 0,
  };

  getIndex = (url: string) => {
    return url.substring(6, url.length - 4);
  };

  handleButton = (step: number) => () => {
    this.setState((prev) => ({
      currentItemIndex: prev.currentItemIndex + step,
    }));
  };

  render() {
    const {
      step,
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { currentItemIndex } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image) => (
            <li
              key={this.getIndex(image)}
              style={{
                transition: `${animationDuration}ms`,
                transform: `translateX(${-currentItemIndex * itemWidth}px)`,
              }}
            >
              <img
                className="Carousel__image"
                src={image}
                alt={this.getIndex(image)}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.handleButton(-step)}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          className="next"
          onClick={this.handleButton(step)}
        >
          Next
        </button>

      </div>
    );
  }
}

export { Carousel };
