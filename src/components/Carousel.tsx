import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  currentIndex: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    currentIndex: 0,
  };

  handleClick = (step: number) => {
    const { images, frameSize } = this.props;
    const { currentIndex } = this.state;
    const firstIndex = 0;
    const lastIndex = images.length - frameSize;
    let nextIndex = currentIndex + step;

    if (step > 0) {
      if (currentIndex === lastIndex) {
        nextIndex = firstIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = lastIndex;
      }
    }

    if (step < 0) {
      if (currentIndex === firstIndex) {
        nextIndex = lastIndex;
      } else if (nextIndex < firstIndex) {
        nextIndex = firstIndex;
      }
    }

    this.setState({
      currentIndex: nextIndex,
    });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { currentIndex } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          animation: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((img, index) => (
            <li
              key={img}
              className="Carousel__item"
              style={{
                transform: `translateX(${-currentIndex * itemWidth}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                src={img}
                alt={`${index}`}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          className="button"
          type="button"
          disabled={currentIndex <= 0 && !infinite}
          onClick={() => {
            this.handleClick(-step);
          }}
        >
          Prev
        </button>
        <button
          className="button"
          type="button"
          data-cy="next"
          disabled={currentIndex >= images.length - frameSize
            && !infinite}
          onClick={() => {
            this.handleClick(step);
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
