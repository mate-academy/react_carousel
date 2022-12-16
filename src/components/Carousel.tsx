import { Component } from 'react';
import './Carousel.scss';
import classNames from 'classnames';
import { Carousel as Props } from '../types/Carousel';

type State = {
  translateX: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    translateX: 0,
  };

  gap = 10;

  calculateWraperClasses = ({ frameSize, itemWidth }: Props) => {
    const containerSize = frameSize * itemWidth + this.gap * (frameSize - 1);

    const classes = [
      'Carousel__list-wrapper',
      `size-${containerSize}`,
    ];

    return classNames(...classes);
  };

  calculateListClasses = ({ animationDuration }: Props) => {
    const { translateX } = this.state;

    const classes = [
      'Carousel__list',
      `move-to-${translateX}`,
      `Animation-duration-${animationDuration}`,
    ];

    return classNames(...classes);
  };

  calculateItemClasses = ({ itemWidth }: Props) => {
    const classes = [
      'Carousel__list-item',
      `item-size-${itemWidth}`,
    ];

    return classNames(...classes);
  };

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
    } = this.props;

    return (
      <div className="Carousel">
        <div className={this.calculateWraperClasses(this.props)}>
          <ul className={this.calculateListClasses(this.props)}>
            {
              images.map((image, index) => (
                <li
                  key={image}
                  className={this.calculateItemClasses(this.props)}
                >
                  <img
                    className="Carousel__item-img"
                    src={image}
                    alt={`${index + 1}`}
                    width={itemWidth}
                  />
                </li>
              ))
            }
          </ul>
        </div>

        <div className="button-container">
          <button type="button" onClick={this.moveToPrev}>Prev</button>

          <button
            data-cy="next"
            type="button"
            onClick={this.moveToNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
