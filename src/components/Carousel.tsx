import { PureComponent } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

class Carousel extends PureComponent<CarouselProps, {}> {
  componentDidUpdate() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const carouselList = document
      .querySelector('.Carousel__list') as HTMLElement;
    const carouselContainer = document
      .querySelector('.Carousel__list--container') as HTMLElement;

    images.map(image => {
      const img = Array.from(document
        .querySelectorAll('img'))[images.indexOf(image)];

      img.style.height = `${itemWidth}px`;
      img.style.width = `${itemWidth}px`;

      return null;
    });

    carouselList.style.transition = `all ${animationDuration}ms`;
    carouselContainer.style.width = `${itemWidth * frameSize}px`;
  }

  calculateButtonSteps = (button: string) => {
    const {
      images,
      frameSize,
      step,
      itemWidth,
      infinite,
    } = this.props;

    const list: (HTMLElement | null) = document
      .querySelector('.Carousel__list');

    if (list != null) {
      const maxPossibleWidth = images.length * itemWidth;
      const leftPlaceToMove = (itemWidth * frameSize - maxPossibleWidth);

      const style = getComputedStyle(list);
      const matrix = new WebKitCSSMatrix(style.transform);
      const accurateMatrix = Math
        .ceil(matrix.m41 / itemWidth) * itemWidth;

      if (button === 'prevButton') {
        if (accurateMatrix >= leftPlaceToMove) {
          document
            .querySelector('.button--next')
            ?.removeAttribute('disabled');

          if (accurateMatrix >= (-itemWidth * step)) {
            list.style.transform = 'translateX(0px)';

            if (!infinite) {
              document
                .querySelector('.button--prev')
                ?.setAttribute('disabled', 'true');
            }

            if (infinite && accurateMatrix === 0) {
              list.style.transform = `translateX(${leftPlaceToMove}px)`;
            }

            return;
          }

          list.style.transform = `translateX(${accurateMatrix + (itemWidth * step)}px)`;
        }
      }

      if (button === 'nextButton') {
        if (leftPlaceToMove <= accurateMatrix) {
          document
            .querySelector('.button--prev')
            ?.removeAttribute('disabled');

          if (accurateMatrix <= (
            leftPlaceToMove + (itemWidth * step))) {
            list.style.transform = `translateX(${leftPlaceToMove}px)`;

            if (!infinite) {
              document
                .querySelector('.button--next')
                ?.setAttribute('disabled', 'true');
            }

            if (infinite && leftPlaceToMove === accurateMatrix) {
              list.style.transform = 'translateX(0px)';
            }

            return;
          }

          list.style.transform = `translateX(${accurateMatrix - itemWidth * step}px)`;
        }
      }
    }
  };

  render() {
    const { images } = this.props;

    return (
      <div className="Carousel">
        <div className="Carousel__list--container">
          <ul className="Carousel__list">
            {images.map(image => {
              return (
                <li
                  key={images.indexOf(image)}
                >
                  <img
                    src={image}
                    alt={`${images.indexOf(image)}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className="button button--prev"
          onClick={() => {
            this.calculateButtonSteps('prevButton');
          }}
        >
          Prev
        </button>

        <button
          type="button"
          className="button button--next"
          data-cy="next"
          onClick={() => {
            this.calculateButtonSteps('nextButton');
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
