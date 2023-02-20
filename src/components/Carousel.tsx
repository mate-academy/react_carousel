import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemSize: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  transformPosition: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    transformPosition: 0,
  };

  gap = 10;

  nextButtonHandler = () => {
    const {
      images,
      itemSize,
      step,
      frameSize,
      infinite,
    } = this.props;

    this.setState(state => {
      const result
        = state.transformPosition - itemSize * step - this.gap * step;

      const maxTransformPosition
        = -(itemSize * images.length
          + this.gap * (images.length - frameSize)
          - itemSize * frameSize);

      if (state.transformPosition === maxTransformPosition && infinite) {
        return ({
          transformPosition: 0,
        });
      }

      if (result < maxTransformPosition) {
        return ({
          transformPosition: maxTransformPosition,
        });
      }

      return ({
        transformPosition: result,
      });
    });
  };

  prevButtonHandler = () => {
    const {
      images,
      itemSize,
      step,
      frameSize,
      infinite,
    } = this.props;

    this.setState(state => {
      const result
        = state.transformPosition + itemSize * step + this.gap * step;

      const maxTransformPosition
        = itemSize * images.length
          + this.gap * (images.length - frameSize)
          - itemSize * frameSize;

      if (state.transformPosition === 0 && infinite) {
        return ({
          transformPosition: -maxTransformPosition,
        });
      }

      if (result > 0) {
        return ({
          transformPosition: 0,
        });
      }

      return ({
        transformPosition: result,
      });
    });
  };

  render() {
    const {
      images,
      itemSize,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.props;

    const { transformPosition } = this.state;

    const maxTransformPosition
      = itemSize * images.length - this.gap * step - itemSize * step;

    return (
      <div className="Carousel">
        <div
          className="Carousel__images-container"
          style={{ width: `${itemSize * frameSize + (frameSize - 1) * this.gap}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${transformPosition}px)`,
              transition: `${animationDuration}ms`,
              gap: `${this.gap}px`,
            }}
          >
            {images.map((imageUrl, index) => (
              <li
                className="Carousel__item"
                key={String(index + 1)}
              >
                <img
                  className="Carousel__image"
                  src={imageUrl}
                  alt={String(index + 1)}
                  width={itemSize}
                  height={itemSize}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__navigation-buttons">
          <button
            type="button"
            onClick={this.prevButtonHandler}
            className="Carousel__button Carousel__button-prev"
            style={{
              top: `${itemSize / 2 - 10}px`,
            }}
            disabled={
              infinite
                ? false
                : transformPosition >= 0
            }
          >
            ⇦
          </button>

          <button
            className="Carousel__button Carousel__button-next"
            type="button"
            data-cy="next"
            onClick={this.nextButtonHandler}
            style={{
              top: `${itemSize / 2 - 10}px`,

            }}
            disabled={
              infinite
                ? false
                : -maxTransformPosition >= transformPosition
            }
          >
            ⇨
          </button>
        </div>
      </div>
    );
  }
}
