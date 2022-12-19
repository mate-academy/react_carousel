import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  isInfinite: boolean;
};

const gap = 10;

class Carousel extends React.Component<Props> {
  intervalId = 0;

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.showNext();
    }, this.props.animationDuration);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.animationDuration === this.props.animationDuration) {
      return;
    }

    clearInterval(this.intervalId);

    this.intervalId = window.setInterval(() => {
      this.showNext();
    }, this.props.animationDuration);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  showNext = () => {
    if (this.props.isInfinite) {
      clearInterval(this.intervalId);
    }

    const carousel: HTMLUListElement | null
      = document.querySelector('.Carousel__list');

    if (!carousel) {
      return;
    }

    const scrollValue = (this.props.itemWidth + gap) * this.props.step;

    carousel.scrollTo({
      left: Math.ceil(carousel.scrollLeft) + scrollValue,
      behavior: 'smooth',
    });
  };

  showPrevious = () => {
    if (this.props.isInfinite) {
      clearInterval(this.intervalId);
    }

    const carousel: HTMLUListElement | null
      = document.querySelector('.Carousel__list');

    if (!carousel) {
      return;
    }

    const scrollValue = (this.props.itemWidth + gap) * this.props.step;

    carousel.scrollTo({
      left: Math.ceil(carousel.scrollLeft) - scrollValue,
      behavior: 'smooth',
    });
  };

  scroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = e.currentTarget;
    const nextButton = document.querySelector('.Carousel__button--next');
    const prevButton = document.querySelector('.Carousel__button--prev');

    if (!this.props.isInfinite && Math.ceil(scrollLeft) === (scrollWidth
      - clientWidth)) {
      const carousel: HTMLUListElement | null
        = document.querySelector('.Carousel__list');

      if (!carousel) {
        return;
      }

      setTimeout(() => {
        carousel.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }, 2000);
    }

    const maxWidth = (scrollWidth - clientWidth);

    switch (Math.ceil(scrollLeft)) {
      case maxWidth:
        nextButton?.classList.add('disabled');
        break;

      case 0:
        prevButton?.classList.add('disabled');
        break;

      default:
        nextButton?.classList.remove('disabled');
        prevButton?.classList.remove('disabled');
        break;
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
    } = this.props;
    const containerWidth = frameSize * (itemWidth + gap) - gap;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{ width: `${containerWidth}px` }}
          onScroll={this.scroll}
        >
          {images.map((image) => (
            <li className="Carousel__item" key={image}>
              <img
                src={image}
                alt={image}
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons-container">
          <button
            type="button"
            name="Prev"
            onClick={this.showPrevious}
            className="Carousel__button Carousel__button--prev disabled"
          >
            Prev
          </button>
          <button
            type="button"
            name="Next"
            onClick={this.showNext}
            className="Carousel__button Carousel__button--next"
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
