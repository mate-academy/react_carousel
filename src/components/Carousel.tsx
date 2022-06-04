import React from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

type State = {
  activeId: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    activeId: 0,
  };

  shiftToLeft = (step: number, length: number) => {
    this.setState((currentState) => {
      if (currentState.activeId === 0) {
        return { activeId: length - step };
      }

      if (currentState.activeId < step) {
        return { activeId: 0 };
      }

      return { activeId: currentState.activeId - step };
    });
  };

  shiftToRight = (step: number, length: number) => {
    this.setState((currentState) => {
      if (currentState.activeId === length - step) {
        return { activeId: 0 };
      }

      if (currentState.activeId + step > length - step) {
        return { activeId: length - step };
      }

      return { activeId: currentState.activeId + step };
    });
  };

  calculateShift = (
    activeId: number,
    itemWidth: number,
    length: number,
    step: number,
  ) => {
    if (activeId < length - step) {
      return activeId * itemWidth;
    }

    return (length - step) * itemWidth;
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { activeId } = this.state;

    const carouselWidth = {
      width: `${frameSize * itemWidth}px`,
    };

    const shiftAnimation = {
      transition: `all ${animationDuration}ms ease`,
      transform: `translateX(-${this.calculateShift(activeId, itemWidth, images.length, step)}px)`,
    };

    return (
      <div className="Carousel" style={carouselWidth}>
        <ul style={shiftAnimation} className="Carousel__list">
          {images.map(image => (
            <li key={image}>
              <img src={image} alt={image} />
            </li>
          ))}
        </ul>

        <div className="Carousel__navigation">
          <button
            type="button"
            onClick={() => {
              this.shiftToLeft(step, images.length);
            }}
          >
            Prev
          </button>
          <div className="Carousel__position">
            {images.map((image: string, i: number) => (
              <div
                key={image}
                className={classNames(
                  'Carousel__dot', { 'Carousel__dot-active': activeId === i },
                )}
              />
            ))}
          </div>
          <button
            type="button"
            data-cy="next"
            onClick={() => {
              this.shiftToRight(step, images.length);
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
