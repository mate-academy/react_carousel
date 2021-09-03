import React from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
};

type State = {
  activeId: number;
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    activeId: 0,
  };

  toPrevious = (step: number, itemsLength: number) => {
    this.setState((state) => {
      let newId;

      if (state.activeId === 0) {
        newId = itemsLength - step;
      } else {
        newId = state.activeId < step
          ? 0
          : state.activeId - step;
      }

      return { activeId: newId };
    });
  };

  toNext = (step: number, itemsLength: number) => {
    this.setState((state) => {
      let newId;

      if (state.activeId === itemsLength - step) {
        newId = 0;
      } else {
        newId = state.activeId + step > itemsLength - step
          ? itemsLength - step
          : state.activeId + step;
      }

      return { activeId: newId };
    });
  };

  translateCalculate = (activeId: number, itemWidth: number, length: number, step: number) => (
    activeId < length - step
      ? activeId * itemWidth
      : (length - step) * itemWidth
  );

  render() {
    const {
      images,
      step = 3,
      frameSize = 3,
      itemWidth = 130,
      animationDuration = 1000,
    } = this.props;

    const { activeId } = this.state;

    const carouselWidth = {
      width: `${frameSize * itemWidth}px`,
    };

    const picWidth = {
      width: `${itemWidth}px`,
    };

    const animationStyle = {
      transition: `transform ${animationDuration}ms ease`,
      transform: `translateX(-${this.translateCalculate(activeId, itemWidth, images.length, step)}px)`,
    };

    return (
      <div style={carouselWidth} className="Carousel">
        <ul style={animationStyle} className="Carousel__list">
          {images.map((image: string, i: number) => (
            <li key={image}>
              <img src={image} style={picWidth} alt={i.toString()} />
            </li>
          ))}
        </ul>
        <div className="Carousel__controls">
          <button
            type="button"
            className="Carousel__button Carousel__button--prev"
            onClick={() => {
              this.toPrevious(step, images.length);
            }}
          >
            { }
          </button>
          <div className="Carousel__dots">
            {images.map((image: string, i: number) => (
              <div key={image} className={classNames('Carousel__dot', { 'Carousel__dot--active': activeId === i })} />
            ))}
          </div>
          <button
            type="button"
            className="Carousel__button Carousel__button--next"
            onClick={() => {
              this.toNext(step, images.length);
            }}
          >
            { }
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
