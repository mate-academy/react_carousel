import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemSize: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

type State = {
  transform: string,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    transform: 'translateX(0px)',
  };

  render() {
    const {
      images,
      itemSize,
      frameSize,
      step,
      animationDuration,
    } = this.props;

    const { transform } = this.state;

    const gapMultiplier = 0.1;
    const itemsGap = itemSize * gapMultiplier;
    const totalVisibleGap = (frameSize - 1) * itemsGap;
    const scrollGap = step * itemsGap;

    const carouselWidth = itemSize * frameSize + totalVisibleGap;
    const currentPosition = +transform.slice(transform.indexOf('(') + 1, -3);
    const scrollValue = step * itemSize + scrollGap;

    const lastRightPosition = (
      itemSize * (images.length - frameSize) * (-1 - gapMultiplier)
    );
    const lastLeftPosition = 0;

    return (
      <>
        <div
          className="Carousel"
          style={{ width: `${carouselWidth}px` }}
        >
          <ul
            className="Carousel__wrapper"
            style={{
              transform: `${transform}`,
              transition: `transform ${animationDuration}ms`,
              gap: `${itemsGap}px`,
            }}
          >
            {images.map(image => {
              const imageId = image.slice(
                image.lastIndexOf('/') + 1, image.lastIndexOf('.'),
              );

              return (
                <li>
                  <img
                    className="Carousel__image"
                    src={image}
                    alt={imageId}
                    key={imageId}
                    height={itemSize}
                    width={itemSize}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="Carousel__buttons-container">
          <button
            className="Carousel__button Carousel__button--prev"
            type="button"
            onClick={() => (
              this.setState(
                (currentPosition + scrollValue) > lastLeftPosition
                  ? { transform: `translateX(${lastLeftPosition}px)` }
                  : { transform: `translateX(${currentPosition + scrollValue}px)` },
              )
            )}
            disabled={transform === `translateX(${lastLeftPosition}px)` || false}
          >
            Prev
          </button>

          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={() => (
              this.setState(
                (currentPosition - scrollValue) < lastRightPosition
                  ? { transform: `translateX(${lastRightPosition}px)` }
                  : { transform: `translateX(${currentPosition - scrollValue}px)` },
              )
            )}
            disabled={transform === `translateX(${lastRightPosition}px)` || false}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
