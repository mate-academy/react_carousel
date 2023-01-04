import { Component } from 'react';
import './Carousel.scss';
import './button.scss';

type State = {
  translateX: number,
};

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    translateX: 0,
  };

  gap = 10;

  moveToNext = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const imagesLength = images.length;
    const gap = (step * this.gap);
    const newValue = itemWidth * step + gap;
    const maxScrol = (itemWidth * imagesLength)
      + (this.gap * imagesLength)
      - (frameSize * itemWidth + this.gap * frameSize);

    this.setState((state) => {
      if (state.translateX === maxScrol && infinite) {
        return {
          translateX: 0,
        };
      }

      if (state.translateX + newValue >= maxScrol) {
        return {
          translateX: maxScrol,
        };
      }

      return {
        translateX: state.translateX + newValue,
      };
    });
  };

  moveToPrev = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const imagesLength = images.length;
    const gap = (step * this.gap);
    const newValue = itemWidth * step + gap;
    const maxScrol = (itemWidth * imagesLength)
      + (this.gap * imagesLength)
      - (frameSize * itemWidth + this.gap * frameSize);

    this.setState((state) => {
      if (state.translateX === 0 && infinite) {
        return {
          translateX: maxScrol,
        };
      }

      if (state.translateX - newValue <= 0) {
        return {
          translateX: 0,
        };
      }

      return {
        translateX: state.translateX - newValue,
      };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const { translateX } = this.state;

    const containerSize = frameSize * itemWidth + this.gap * (frameSize - 1);

    return (
      <div className="Carousel">
        <div
          className="Carousel__list-wrapper"
          style={{
            width: containerSize,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${-translateX}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            {
              images.map((image, index) => (
                <li
                  key={image}
                  className="Carousel__list-item"
                  style={{
                    width: itemWidth,
                    height: itemWidth,
                  }}
                >
                  <img
                    className="Carousel__item-img"
                    src={image}
                    alt={`emoji number ${index + 1}`}
                    width={itemWidth}
                  />
                </li>
              ))
            }
          </ul>
        </div>

        <div className="button-container">
          <button
            className="button button-prev"
            type="button"
            onClick={this.moveToPrev}
          >
            {/* Prev */}
          </button>

          <button
            className="button button-next"
            data-cy="next"
            type="button"
            onClick={this.moveToNext}
          >
            {/* Next */}
          </button>
        </div>
      </div>
    );
  }
}
