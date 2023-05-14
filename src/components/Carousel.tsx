import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

interface State {
  scrollWidth: number;
}

class Carousel extends Component<Props, State> {
  state = {
    scrollWidth: 0,
  };

  gap = 10;

  gapWidth = this.gap * (this.props.images.length - 1);

  handleSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonType = e.currentTarget.innerHTML;

    const {
      itemWidth,
      step,
      infinite,
    } = this.props;

    const scrollStep = step * itemWidth + (step - 1) * this.gap;

    const maxScrollWidth = this.getMaxScrollWidth();

    if (buttonType === 'Next') {
      this.nextSlideHandler(scrollStep, maxScrollWidth, infinite);
    }

    if (buttonType === 'Prev') {
      this.prevSlideHandler(scrollStep, maxScrollWidth, infinite);
    }
  };

  nextSlideHandler = (
    scrollStep: number,
    maxScrollWidth: number,
    infinite: boolean,
  ) => {
    const { scrollWidth } = this.state;

    if ((scrollWidth + scrollStep < maxScrollWidth)) {
      this.setState((prevState) => ({
        scrollWidth: prevState.scrollWidth + scrollStep + this.gap,
      }));
    } else {
      if (infinite && scrollWidth === maxScrollWidth) {
        this.setState({ scrollWidth: 0 });

        return;
      }

      this.setState({ scrollWidth: maxScrollWidth });
    }
  };

  prevSlideHandler = (
    scrollStep: number,
    maxScrollWidth: number,
    infinite: boolean,
  ) => {
    const { scrollWidth } = this.state;

    if (scrollWidth - scrollStep > 0) {
      this.setState((prevState) => ({
        scrollWidth: prevState.scrollWidth - scrollStep - this.gap,
      }));
    } else {
      if (infinite && scrollWidth === 0) {
        this.setState({ scrollWidth: maxScrollWidth });

        return;
      }

      this.setState({ scrollWidth: 0 });
    }
  };

  getMaxScrollWidth = () => {
    const {
      images,
      itemWidth,
      frameSize,
    } = this.props;

    const carouselWidth = images.length * itemWidth + this.gapWidth;

    const frameWidth = itemWidth * frameSize + (frameSize - 1) * this.gap;

    return carouselWidth - frameWidth;
  };

  render() {
    const {
      images,
      itemWidth,
      animationDuration,
      infinite,
      frameSize,
    } = this.props;

    const { scrollWidth } = this.state;

    const carouselWidth = images.length * itemWidth + this.gapWidth;

    const frameGap = frameSize - 1 < 0
      ? 0
      : (frameSize - 1) * this.gap;

    const frameWidth = itemWidth * frameSize + frameGap;

    const transition = `transform ${animationDuration / 1000}s ease`;

    const transform = `translate(-${scrollWidth}px, 0)`;

    const disabledPrev = scrollWidth === 0 && !infinite
      ? 'Carousel__button--disabled'
      : '';

    const disabledNext
    = scrollWidth === this.getMaxScrollWidth() && !infinite
      ? 'Carousel__button--disabled'
      : '';

    return (
      <div
        className="Carousel"
        style={{ width: frameWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition,
            width: carouselWidth,
            gap: this.gap,
            transform,
          }}
        >
          {images.map((image, i) => (
            <li key={image}>
              <img
                src={image}
                alt={`${i + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`Carousel__button Carousel__button--prev ${disabledPrev}`}
          onClick={this.handleSlide}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className={`Carousel__button Carousel__button--next ${disabledNext}`}
          onClick={this.handleSlide}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
