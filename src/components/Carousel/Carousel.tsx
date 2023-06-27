import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  position: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  gap = 0.2 * this.props.itemWidth;

  handleClickNext = () => {
    const {
      step,
      itemWidth,
      images,
      frameSize,
      infinite,
    } = this.props;

    this.setState(state => {
      const result
        = state.position - step * (itemWidth + this.gap);

      const maxPosition = -((itemWidth + this.gap)
        * (images.length - frameSize));

      if (state.position === maxPosition && infinite) {
        return {
          position: 0,
        };
      }

      if (result < maxPosition) {
        return {
          position: maxPosition,
        };
      }

      return {
        position: result,
      };
    });
  };

  handleClickPrevious = () => {
    const {
      step,
      itemWidth,
      images,
      frameSize,
      infinite,
    } = this.props;

    this.setState(state => {
      const result = state.position + step * (itemWidth + this.gap);

      const maxPosition = -((itemWidth + this.gap)
      * (images.length - frameSize));

      if (state.position === 0 && infinite) {
        return {
          position: maxPosition,
        };
      }

      if (result > 0) {
        return {
          position: 0,
        };
      }

      return {
        position: result,
      };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const visibleCarouselWidth = itemWidth * frameSize
      + (frameSize - 1) * this.gap;

    const maxPosition = -((itemWidth + this.gap)
    * (images.length - frameSize));

    return (
      <div
        className="Carousel"
        style={{ width: `${visibleCarouselWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: `${animationDuration}ms`,
            gap: `${this.gap}px`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.handleClickPrevious}
            disabled={infinite
              ? false
              : position >= 0}
          >
            {'<'}
          </button>
          <button
            className="Carousel__button"
            type="button"
            data-cy="next"
            onClick={this.handleClickNext}
            disabled={infinite
              ? false
              : position <= maxPosition}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
