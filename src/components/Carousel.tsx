import { Component } from 'react';
import { CarouselState } from '../types/CarouselState';

import './Carousel.scss';

type Props = CarouselState;

type State = {
  shift: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    shift: 0,
  };

  image = this.props.images;

  maxShift = 1;

  translateNext = () => {
    const { itemWidth, step } = this.props;
    const { shift } = this.state;
    const shiftNext = itemWidth * step + shift;

    const currentMaxShift = itemWidth * this.image.length
    - step * itemWidth
    + ((step - this.props.frameSize) * itemWidth);

    this.setState({
      shift: shiftNext > currentMaxShift ? currentMaxShift : shiftNext,
    });
    this.maxShift = currentMaxShift;

    if (this.props.infinity) {
      if (shiftNext > currentMaxShift && shift !== currentMaxShift) {
        this.setState({
          shift: currentMaxShift,
        });
      } else if (shift === currentMaxShift) {
        this.setState({
          shift: 0,
        });
      } else {
        this.setState({
          shift: shiftNext,
        });
      }
    }
  };

  translatePrev = () => {
    const { itemWidth, step } = this.props;
    const { shift } = this.state;
    const shiftPrev = shift - itemWidth * step;

    const currentMaxShift = itemWidth * this.image.length
    - step * itemWidth
    + ((step - this.props.frameSize) * itemWidth);

    this.setState({
      shift: shiftPrev > 0 ? shiftPrev : 0,
    });

    if (this.props.infinity) {
      if (shiftPrev > 0 && shift !== 0) {
        this.setState({
          shift: shiftPrev,
        });
      } else if (shift === 0) {
        this.setState({
          shift: currentMaxShift,
        });
      } else {
        this.setState({
          shift: 0,
        });
      }
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;
    const { shift } = this.state;

    return (
      <div className="Carousel">
        <button
          type="button"
          className="Carousel__button Carousel__button--prev"
          onClick={() => {
            this.translatePrev();
          }}
          disabled={(shift === 0 && !this.props.infinity)
            || frameSize === images.length}
        >
          {' '}
        </button>
        <ul className="Carousel__list" style={{ width: `${frameSize * itemWidth}px` }}>
          <div className="Carousel__container" style={{ transform: `translateX(-${shift}px)`, transition: `transform ${animationDuration / 1000}s` }}>
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={index.toString()}
                  className="Carousel__image"
                  style={{ width: itemWidth, height: itemWidth }}
                />
              </li>
            ))}
          </div>
        </ul>
        <button
          type="button"
          className="Carousel__button Carousel__button--next"
          data-cy="next"
          onClick={() => {
            this.translateNext();
          }}
          disabled={(shift === this.maxShift && !this.props.infinity)
            || frameSize === images.length}
        >
          {' '}
        </button>
      </div>
    );
  }
}
