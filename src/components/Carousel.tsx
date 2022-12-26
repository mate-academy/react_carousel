import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemSize: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  transformPosition: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    transformPosition: 0,
  };

  gap = 0.1 * this.props.itemSize;

  handleClickNext = () => {
    const {
      step,
      itemSize,
      images,
      frameSize,
      infinite,
    } = this.props;

    this.setState(state => {
      const result
        = state.transformPosition - step * itemSize - step * this.gap;
      const maxTransformPosition = -(itemSize * images.length
        + this.gap * (images.length - frameSize) - frameSize * itemSize);

      if (state.transformPosition === maxTransformPosition && infinite) {
        return {
          transformPosition: 0,
        };
      }

      if (result < maxTransformPosition) {
        return {
          transformPosition: maxTransformPosition,
        };
      }

      return {
        transformPosition: result,
      };
    });
  };

  handleClickPrev = () => {
    const {
      step,
      itemSize,
      images,
      frameSize,
      infinite,
    } = this.props;

    const gap = 0.1 * itemSize;

    this.setState(state => {
      const result = state.transformPosition + step * itemSize + step * gap;
      const maxTransformPosition = -(itemSize * images.length
        + gap * (images.length - frameSize) - frameSize * itemSize);

      if (state.transformPosition === 0 && infinite) {
        return {
          transformPosition: maxTransformPosition,
        };
      }

      if (result > 0) {
        return {
          transformPosition: 0,
        };
      }

      return {
        transformPosition: result,
      };
    });
  };

  render() {
    const {
      images,
      itemSize,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const { transformPosition } = this.state;

    const gap = 0.1 * itemSize;
    const carouselViewWidth = itemSize * frameSize + (frameSize - 1) * gap;
    const maxTransformPosition = -(itemSize * images.length
      + gap * (images.length - frameSize) - frameSize * itemSize);

    return (
      <>
        <div
          className="Carousel"
          style={{ width: `${carouselViewWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${transformPosition}px)`,
              transition: `${animationDuration}ms`,
              gap: `${gap}px`,
            }}
          >
            {images.map(image => {
              const imageId = image.slice(
                image.lastIndexOf('/') + 1, image.lastIndexOf('.'),
              );

              return (
                <li key={imageId}>
                  <img
                    className="Carousel__img"
                    src={image}
                    alt={imageId}
                    height={itemSize}
                    width={itemSize}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="Carousel__buttons-container">
          <button
            className="Carousel__button Carousel__button--prev"
            type="button"
            onClick={this.handleClickPrev}
            disabled={infinite
              ? false
              : transformPosition >= 0}
          >
            <img
              src="./img/arrow-left.png"
              alt="Next button"
              width="150"
            />
          </button>

          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={this.handleClickNext}
            disabled={infinite
              ? false
              : transformPosition <= maxTransformPosition}
          >
            <img
              src="./img/arrow-right.png"
              alt="Next button"
              width="150"
            />
          </button>
        </div>
      </>
    );
  }
}
