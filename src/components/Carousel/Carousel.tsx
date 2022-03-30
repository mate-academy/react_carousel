import React from 'react';
import { CarouselSettings } from '../../types/CarouselSettings';
import './Carousel.scss';

interface State {
  shift: number;
  itemAmount: number;
}

export class Carousel extends React.Component<CarouselSettings, State> {
  state = {
    shift: 0,
    itemAmount: this.props.images.length,
  };

  caclMaxShift = () => {
    const { frameSize, itemWidth } = this.props;
    const { itemAmount } = this.state;

    return itemWidth * (itemAmount - frameSize);
  };

  calcWrapperWidth = () => {
    return this.props.itemWidth * this.props.frameSize;
  };

  nextButtonHandler = () => {
    const { shift } = this.state;
    const { itemWidth, step } = this.props;
    const maxShift = -this.caclMaxShift();

    if (shift !== maxShift) {
      this.setState((state) => {
        let toShift = state.shift - itemWidth * step;

        if (toShift < maxShift) {
          toShift = maxShift;
        }

        return {
          shift: toShift,
        };
      });
    }
  };

  prevButtonHandler = () => {
    const { shift } = this.state;
    const { itemWidth, step } = this.props;

    if (shift !== 0) {
      this.setState((state) => {
        let toShift = state.shift + itemWidth * step;

        if (toShift > 0) {
          toShift = 0;
        }

        return {
          shift: toShift,
        };
      });
    }
  };

  render() {
    const { prevButtonHandler, nextButtonHandler, calcWrapperWidth } = this;
    const { images, animationDuration, itemWidth } = this.props;
    const { shift } = this.state;

    const carouselListStyles = {
      transform: `translateX(${shift}px)`,
      transition: `transform ${animationDuration}ms linear`,
    };

    const carouselWrapperStyles = {
      width: calcWrapperWidth(),
    };

    const slideStyles = {
      width: itemWidth,
    };

    return (
      <div className="carousel">
        <div className="carousel__list-wrapper" style={carouselWrapperStyles}>
          <ul className="carousel__list" style={carouselListStyles}>
            {images.map((image, i) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`Emoji ${(i + 1).toString()}`}
                  style={slideStyles}
                />
              </li>
            ))}
          </ul>
        </div>

        <button type="button" onClick={prevButtonHandler}>Prev</button>
        <button type="button" onClick={nextButtonHandler}>Next</button>
      </div>
    );
  }
}
