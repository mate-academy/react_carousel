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
  imagesScrolled: number;
}

class Carousel extends Component<Props, State> {
  state = {
    imagesScrolled: 0,
  };

  handleSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonType = e.currentTarget.innerHTML;

    const { imagesScrolled } = this.state;
    const {
      images,
      step,
      frameSize,
      infinite,
    } = this.props;

    if (buttonType === 'Next') {
      this.nextSlideHandler(
        images,
        step,
        frameSize,
        infinite,
        imagesScrolled,
      );
    }

    if (buttonType === 'Prev') {
      this.prevSlideHandler(
        images,
        step,
        frameSize,
        infinite,
        imagesScrolled,
      );
    }
  };

  nextSlideHandler = (
    images: string[],
    step: number,
    frameSize: number,
    infinite: boolean,
    imagesScrolled: number,
  ) => {
    if (imagesScrolled + step < images.length - frameSize) {
      this.setState(prevState => ({
        imagesScrolled: prevState.imagesScrolled + step,
      }));
    } else if (infinite && imagesScrolled === images.length - frameSize) {
      this.setState({ imagesScrolled: 0 });
    } else {
      this.setState({ imagesScrolled: images.length - frameSize });
    }
  };

  prevSlideHandler = (
    images: string[],
    step: number,
    frameSize: number,
    infinite: boolean,
    imagesScrolled: number,
  ) => {
    if (imagesScrolled - step > 0) {
      this.setState(prevState => ({
        imagesScrolled: prevState.imagesScrolled - step,
      }));
    } else if (infinite && imagesScrolled === 0) {
      this.setState({ imagesScrolled: images.length - frameSize });
    } else {
      this.setState({ imagesScrolled: 0 });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      animationDuration,
      infinite,
      frameSize,
    } = this.props;

    const { imagesScrolled } = this.state;

    const gap = 10;

    const carouselWidth = images.length * itemWidth + gap * (images.length - 1);

    const frameGap = frameSize - 1 < 0
      ? 0
      : (frameSize - 1) * gap;

    const frameWidth = itemWidth * frameSize + frameGap;

    const transition = `transform ${animationDuration / 1000}s ease`;

    const scrolledWidth = imagesScrolled * itemWidth + imagesScrolled * gap;

    const transform = `translate(-${scrolledWidth}px, 0)`;

    const disabledPrev = imagesScrolled === 0 && !infinite
      ? 'Carousel__button--disabled'
      : '';

    const disabledNext
    = imagesScrolled === images.length - frameSize && !infinite
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
            gap,
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
