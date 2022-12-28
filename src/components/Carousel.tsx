import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

type State = {
  translateX: number;
};

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    translateX: 0,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.props;

    const { translateX } = this.state;

    const gap = 10;
    const carouselWidth = itemWidth * frameSize + gap * (frameSize - 1);

    const scrollSize = step * itemWidth + step * gap;
    const maxTranslateX = -(itemWidth * (images.length - frameSize)
       + gap * (images.length - frameSize));

    const moveToNext = () => {
      this.setState(
        (translateX - scrollSize) < maxTranslateX
          ? { translateX: maxTranslateX }
          : { translateX: (translateX - scrollSize) },
      );
    };

    const moveToPrev = () => {
      this.setState(
        (translateX + scrollSize) > 0
          ? { translateX: 0 }
          : { translateX: (translateX + scrollSize) },
      );
    };

    return (
      <div className="Carousel">
        <div className="Carousel__content" style={{ width: carouselWidth }}>
          <ul
            className="Carousel__list"
            style={{
              gap,
              transform: `translateX(${translateX}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            {images.map((image) => (
              <li key={image}>
                <img
                  src={image}
                  alt="img"
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="Carousel__button Carousel__button--prev"
            type="button"
            onClick={moveToPrev}
            disabled={translateX === 0}
          />

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="Carousel__button Carousel__button--next"
            data-cy="next"
            type="button"
            onClick={moveToNext}
            disabled={translateX === maxTranslateX}
          />
        </div>
      </div>
    );
  }
}

export default Carousel;
