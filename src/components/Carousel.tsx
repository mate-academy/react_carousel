import React from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  className?: string,
};

type CarouselState = {
  images: string[],
  currentIndex: number,
};

class Carousel extends React.Component<CarouselProps, CarouselState> {
  state = {
    images: this.props.images,
    currentIndex: 0,
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {};

  timersId: NodeJS.Timeout[] = [];

  currentAnimationDuration: number = this.props.animationDuration;

  isInfinite = false;

  componentDidMount() {
    this.setCarouselInfinity(this.props.infinite);
  }

  componentDidUpdate() {
    const { infinite } = this.props;

    if (infinite && !this.isInfinite) {
      this.setCarouselInfinity();
    } else if (!infinite && this.isInfinite) {
      this.setCarouselInfinity(false);
    }
  }

  componentWillUnmount() {
    this.timersId.forEach(clearTimeout);
  }

  prevSlide = () => {
    const { step, infinite, images } = this.props;
    const { currentIndex } = this.state;
    const newIndex: number = currentIndex - step;

    if (newIndex <= 0 && infinite) {
      const startIndex = images.length + newIndex;

      this.invisibleScroll(
        startIndex + step,
        startIndex,
        this.currentAnimationDuration,
      );
    }

    this.setState({ currentIndex: newIndex > 0 ? newIndex : 0 });
  };

  nextSlide = () => {
    const {
      step, frameSize, infinite, images,
    } = this.props;
    const { currentIndex } = this.state;

    const newIndex: number = currentIndex + step;
    const lastIndex = images.length - frameSize;

    const swapIndex = images.length + step + (currentIndex % 2) - frameSize * +(frameSize === 1);

    if (newIndex >= swapIndex && infinite) {
      const startIndex = (currentIndex % 2) + (newIndex - swapIndex) * +(frameSize !== 1);

      this.invisibleScroll(
        startIndex,
        step + startIndex,
        this.currentAnimationDuration,
      );
    }

    this.setState({
      currentIndex: !infinite && newIndex > lastIndex ? lastIndex : newIndex,
    });
  };

  setCarouselInfinity = (setInfinite = true) => {
    this.currentAnimationDuration = 0;

    const { images, frameSize, animationDuration } = this.props;

    const imagesClone: string[] = [...images];

    if (setInfinite) {
      imagesClone.unshift(...images.slice(-frameSize));
      imagesClone.push(...images.slice(0, frameSize));

      this.setState((state) => ({ currentIndex: state.currentIndex + frameSize }));
    } else {
      this.setState((state) => ({ currentIndex: state.currentIndex - frameSize }));
    }

    this.isInfinite = setInfinite;
    this.setState({ images: imagesClone });

    this.timersId.push(setTimeout(() => {
      this.currentAnimationDuration = animationDuration;
    }, 100));
  };

  invisibleScroll(startIndex: number, endIndex: number, animationDuration: number) {
    this.timersId.push(setTimeout(() => {
      this.currentAnimationDuration = 0;
      this.setState({ currentIndex: startIndex });
    }, 0));

    this.timersId.push(setTimeout(() => {
      this.currentAnimationDuration = animationDuration;
      this.setState({ currentIndex: endIndex });
    }, 100));
  }

  render() {
    const { itemWidth, frameSize, className } = this.props;
    const { images, currentIndex } = this.state;
    let nameIndex = 0;

    return (
      <div
        className={`carousel ${className}`}
        style={{
          width: frameSize * itemWidth,
        }}
      >
        <div className="carousel__slider">
          <ul
            className="carousel__list"
            style={{
              transition: `transform ${this.currentAnimationDuration}ms`,
              transform: `translateX(-${currentIndex * itemWidth}px)`,
              width: images.length * itemWidth,
            }}
          >
            {images.map((image: string) => {
              nameIndex += 1;

              return (
                <li key={`${image}_${nameIndex}`}>
                  <img
                    src={image}
                    alt={`${nameIndex}`}
                    style={{
                      width: itemWidth,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="carousel__buttons">
          <button
            type="button"
            className="carousel__button carousel__button--prev"
            onClick={this.prevSlide}
          >
            Prev
          </button>

          <button
            type="button"
            className="carousel__button carousel__button--next"
            onClick={this.nextSlide}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Carousel.defaultProps = { className: '' };

export default Carousel;
