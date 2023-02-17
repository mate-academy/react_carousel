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
  transform: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    transform: 0,
  };

  handleButton = (direction: 'prev' | 'next') => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const sizeOfHidden = (images.length - frameSize) * itemWidth;

    this.setState((state) => {
      const newTransform = direction === 'prev'
        ? Math.min(state.transform + (itemWidth * step), 0)
        : Math.max(state.transform - (itemWidth * step), -sizeOfHidden);

      if (newTransform === 0 && direction === 'prev' && infinite) {
        return { transform: -sizeOfHidden };
      }

      if (newTransform === -sizeOfHidden
          && direction === 'next'
          && infinite
      ) {
        return { transform: 0 };
      }

      return { transform: newTransform };
    });
  };

  handlePrevButton = () => {
    this.handleButton('prev');
  };

  handleNextButton = () => {
    this.handleButton('next');
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { transform } = this.state;

    const visibleWidthOfCarousel = itemWidth * frameSize;

    const sizeOfHidden = (images.length - frameSize) * itemWidth;

    return (
      <div
        className="Carousel"
        style={{ width: `${visibleWidthOfCarousel}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${transform}px)`,
            transition: `${animationDuration}ms`,
            gap: '1px',
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`emoji№-${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            onClick={this.handlePrevButton}
            disabled={transform === 0 && !infinite}
          >
            {'<'}
          </button>

          <button
            data-cy="next"
            type="button"
            className="Carousel__button"
            onClick={this.handleNextButton}
            disabled={transform === -sizeOfHidden
              && !infinite}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
