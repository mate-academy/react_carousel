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

  gap = 10;

  moveToPrev = () => {
    const { gap } = this;
    const { translateX } = this.state;

    const { itemWidth, step } = this.props;

    const scrollSize = step * itemWidth + step * gap;

    this.setState(
      (translateX + scrollSize) > 0
        ? { translateX: 0 }
        : { translateX: (translateX + scrollSize) },
    );
  };

  moveToNext = () => {
    const { gap } = this;

    const { translateX } = this.state;

    const {
      images,
      itemWidth,
      frameSize,
      step,
    } = this.props;

    const scrollSize = step * itemWidth + step * gap;

    const maxTranslateX = -(itemWidth * (images.length - frameSize)
       + gap * (images.length - frameSize));

    this.setState(
      (translateX - scrollSize) < maxTranslateX
        ? { translateX: maxTranslateX }
        : { translateX: (translateX - scrollSize) },
    );
  };

  render() {
    const { gap } = this;

    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const { translateX } = this.state;

    const carouselWidth = itemWidth * frameSize + gap * (frameSize - 1);

    const maxTranslateX = -(itemWidth * (images.length - frameSize)
       + gap * (images.length - frameSize));

    const { moveToPrev, moveToNext } = this;

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
                  alt={`Smile number ${image.substr(image.lastIndexOf('/') + 1, 1)}`}
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
