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
  transform: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    transform: 0,
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
      transform: Math.min(state.transform + itemWidth * step, 0),
    }));

    if (this.state.transform === 0 && infinite) {
      this.setState({ transform: -hiddenImagesSize });
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
      transform: Math.max(state.transform - (itemWidth * step),
        -hiddenImagesSize),
    }));

    if (this.state.transform === -hiddenImagesSize && infinite) {
      this.setState({ transform: 0 });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      infinite,
      animationDuration,
    } = this.props;

    const { transform } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={{
                transform: `translateX(${transform}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.handlePrevClick}
            disabled={transform === 0 && !infinite}
            data-cy="Next"
          >
            &#8249;
          </button>

          <button
            data-cy="next"
            className="Carousel__button"
            type="button"
            onClick={this.handleNextClick}
            disabled={
              transform === -(images.length - frameSize) * itemWidth
              && !infinite
            }
          >
            &#8250;
          </button>
        </div>
      </div>
    );
  }
}
