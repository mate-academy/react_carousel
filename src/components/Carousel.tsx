/* eslint-disable max-len */
import React from 'react';
import './Carousel.scss';

interface Image {
  id: number;
  path: string;
}

type State = {
  transform: number;
};

type Prop = {
  images: Image[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export class Carousel extends React.Component <Prop, State> {
  state = {
    transform: 0,
  };

  render() {
    const { transform } = this.state;
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;
    const windowForCarousel = itemWidth * frameSize;
    const shiftValue = step * itemWidth;
    const maxShiftValue = -(itemWidth * (images.length - frameSize));

    const toPrev = () => {
      if (transform === 0 && infinite) {
        return this.setState({ transform: maxShiftValue });
      }

      return (this.setState(
        (transform + shiftValue) > 0
          ? { transform: 0 }
          : { transform: transform + shiftValue },
      ));
    };

    const toNext = () => {
      if (transform === maxShiftValue && infinite) {
        return this.setState({ transform: 0 });
      }

      return (this.setState(
        (transform - shiftValue) < maxShiftValue
          ? { transform: maxShiftValue }
          : { transform: transform - shiftValue },
      ));
    };

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{ width: `${windowForCarousel}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `TranslateX(${transform}px)`,
              transition: `transform ${animationDuration}ms linear`,
            }}
          >
            {images.map((image) => {
              return (
                <li key={image.id} className="Carousel__list-item">
                  <img
                    src={image.path}
                    alt={image.id.toString()}
                    width={itemWidth}
                    height={itemWidth}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="button-scrollen prev"
            onClick={toPrev}
          >
            Prev
          </button>
          <button
            type="button"
            className="button-scrollen next"
            data-cy="next"
            onClick={toNext}
            disabled={!infinite ? transform === maxShiftValue : false}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
