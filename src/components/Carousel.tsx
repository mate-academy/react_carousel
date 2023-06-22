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
  currentIdx: number;
};

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    currentIdx: 0,
  };

  handleButtonClick = (step: number) => {
    const { images, frameSize } = this.props;
    const { currentIdx } = this.state;
    const initialIdx = 0;
    const lastIdx = images.length - frameSize;

    let newIdx = currentIdx + step;

    if (step < 0) {
      if (currentIdx === initialIdx) {
        newIdx = lastIdx;
      } else if (newIdx < initialIdx) {
        newIdx = initialIdx;
      }
    }

    if (step > 0) {
      if (currentIdx === lastIdx) {
        newIdx = initialIdx;
      } else if (newIdx > lastIdx) {
        newIdx = lastIdx;
      }
    }

    this.setState({ currentIdx: newIdx });
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
    const { currentIdx } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * itemWidth}px`,
            transition: `width ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={{
                transform: `translateX(${-currentIdx * itemWidth}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={String(index + 1)}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons-container">
          <button
            type="button"
            className="Carousel__button"
            disabled={!currentIdx && !infinite}
            onClick={() => this.handleButtonClick(-step)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            disabled={currentIdx >= images.length - frameSize && !infinite}
            onClick={() => this.handleButtonClick(step)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
