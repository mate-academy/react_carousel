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
    const { frameSize, images } = this.props;
    const { currentItemIndex } = this.state;
    const lastIndex = images.length - frameSize;
    const firstIndex = 0;
    let nextIndex = currentItemIndex + step;

    if (step > 0) {
      if (currentItemIndex === lastIndex) {
        nextIndex = firstIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = lastIndex;
      }
    }

    if (step < 0) {
      if (currentItemIndex === firstIndex) {
        nextIndex = lastIndex;
      } else if (nextIndex < firstIndex) {
        nextIndex = firstIndex;
      }
    }

    this.setState(() => ({
      currentItemIndex: nextIndex,
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
          animation: `${animationDuration}ms`,
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

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            onClick={this.handleButton(-step)}
            disabled={currentItemIndex <= 0}
          >
            Prev
          </button>

          <button
            type="button"
            data-cy="next"
            className="Carousel__button next"
            disabled={currentItemIndex >= images.length - frameSize}
            onClick={this.handleButton(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export { Carousel };
