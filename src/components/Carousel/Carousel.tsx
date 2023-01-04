import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  transform: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    transform: 0,
  };

  handleButtons = (direction: 'prev' | 'next') => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const sizeOfHiddenRegion = (images.length - frameSize) * itemWidth;

    this.setState((state) => {
      const newTransform = direction === 'prev'
        ? Math.min(state.transform + (itemWidth * step), 0)
        : Math.max(state.transform - (itemWidth * step), -sizeOfHiddenRegion);

      if (newTransform === 0 && direction === 'prev' && infinite) {
        return { transform: -sizeOfHiddenRegion };
      }

      if (newTransform === -sizeOfHiddenRegion
            && direction === 'next'
            && infinite
      ) {
        return { transform: 0 };
      }

      return { transform: newTransform };
    });
  };

  handlePrevButton = () => {
    this.handleButtons('prev');
  };

  handleNextButton = () => {
    this.handleButtons('next');
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
                alt={`emjoji-${index + 1}`}
                style={{ width: `${itemWidth}px` }}
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
            // calculated size is sizeOfHiddenRegion
            disabled={transform === -(images.length - frameSize) * itemWidth
              && !infinite}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
