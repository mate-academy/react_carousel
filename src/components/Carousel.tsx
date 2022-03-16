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

  timersId: NodeJS.Timeout[] = [];

  currentAnimationDuration: number = this.props.animationDuration;

  isInfinite = false;

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {};

  componentDidMount() {
    const { frameSize, infinite } = this.props;

    if (infinite) {
      this.setState({ currentIndex: -frameSize });
      this.setCaruselInfinity();
    }
  }

  componentDidUpdate() {
    const {
      frameSize, infinite, animationDuration,
    } = this.props;

    const { currentIndex } = this.state;

    this.currentAnimationDuration = animationDuration;

    if (infinite && !this.isInfinite) {
      this.currentAnimationDuration = 0;

      this.setState({ currentIndex: currentIndex + frameSize });
      this.setCaruselInfinity();

      this.isInfinite = true;

      setTimeout(() => {
        this.currentAnimationDuration = animationDuration;
      }, 100);
    } else if (!infinite && this.isInfinite) {
      this.isInfinite = false;
      this.setCaruselInfinity(false);
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

    let newIndex: number = currentIndex + step;
    const lastIndex = images.length - frameSize;

    if (newIndex > lastIndex && !infinite) {
      newIndex = lastIndex;
    }

    const swapIndex = images.length + step + (currentIndex % 2) - frameSize * +(frameSize === 1);

    if (newIndex >= swapIndex && infinite) {
      const startIndex = (currentIndex % 2) + (newIndex - swapIndex) * +(frameSize !== 1);

      this.invisibleScroll(
        startIndex,
        step + startIndex,
        this.currentAnimationDuration,
      );
    }

    this.setState({ currentIndex: newIndex });
  };

  setCaruselInfinity = (setInfinite = true) => {
    const { images, frameSize } = this.props;

    const imagesClone: string[] = [...images];

    if (setInfinite) {
      imagesClone.unshift(...images.slice(-frameSize));
      imagesClone.push(...images.slice(0, frameSize));
    } else {
      this.setState((state) => ({ currentIndex: state.currentIndex - frameSize }));
    }

    this.setState({ images: imagesClone });
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

    return (
      <div
        className={`carousel ${className}`}
        style={{
          width: frameSize * itemWidth,
        }}
      >
        <ul
          className="carousel__list"
          style={{
            transition: `transform ${this.currentAnimationDuration}ms`,
            transform: `translateX(${-currentIndex * itemWidth}px)`,
            width: images.length * itemWidth,
          }}
        >
          {images.map((image: string, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`${image}_${index}`}>
              <img
                src={image}
                alt={`${index}`}
                style={{
                  width: itemWidth,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="carousel__buttons">
          <button type="button" onClick={this.prevSlide}>
            Prev
          </button>

          <button type="button" onClick={this.nextSlide}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

Carousel.defaultProps = { className: '' };

export default Carousel;
