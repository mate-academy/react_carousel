import { Component } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type CarouselState = {
  images: string[],
  shift: number,
  isInfinite: boolean,
  animationDuration: number,
};

class Carousel extends Component<CarouselProps, CarouselState> {
  state = {
    images: this.props.images,
    shift: 0,
    isInfinite: false,
    animationDuration: this.props.animationDuration,
  };

  timersId: NodeJS.Timeout[] = [];

  componentDidMount() {
    const { frameSize, itemWidth, infinite } = this.props;

    if (infinite) {
      this.state.shift = -frameSize * itemWidth;
      this.setCaruselIsInfinity();
    }
  }

  componentDidUpdate() {
    const {
      frameSize, itemWidth, infinite, animationDuration,
    } = this.props;

    const { shift, isInfinite } = this.state;

    if (infinite && !isInfinite) {
      this.setState({ animationDuration: 0 });

      this.setState({ shift: shift - frameSize * itemWidth });
      this.setCaruselIsInfinity();

      this.setState({ isInfinite: true });

      setTimeout((context) => {
        context.setState({ animationDuration });
      }, 0, this);
    }
  }

  componentWillUnmount() {
    this.timersId.forEach(clearTimeout);
  }

  prevButton = () => {
    const {
      itemWidth, step, infinite, images,
    } = this.props;
    const { shift, animationDuration } = this.state;
    let newShift: number = shift + itemWidth * step;

    if (newShift > 0 && !infinite) {
      newShift = 0;
    }

    if (newShift > 0 && infinite) {
      this.timersId.push(setTimeout(() => {
        this.setState({ animationDuration: 0 });
        this.setState({ shift: -itemWidth * images.length });
      }, 0));

      this.timersId.push(setTimeout(() => {
        this.setState({ animationDuration });
        this.setState({ shift: -itemWidth * (images.length - 1) });
      }, 100));
    }

    this.setState({ shift: newShift });
  };

  nextButton = () => {
    const {
      itemWidth, step, frameSize, infinite, images,
    } = this.props;
    const { shift, animationDuration } = this.state;

    let newShift: number = shift - itemWidth * step;
    const condition = newShift < itemWidth * (frameSize - images.length);

    if (condition && !infinite) {
      newShift = shift - (images.length + shift / itemWidth) * itemWidth + frameSize * itemWidth;
    }

    if (condition && infinite) {
      this.timersId.push(setTimeout(() => {
        this.setState({ animationDuration: 0 });
        this.setState({ shift: -frameSize * itemWidth });
      }, 0));

      this.timersId.push(setTimeout(() => {
        this.setState({ animationDuration });
        this.setState({ shift: -(frameSize + 1) * itemWidth });
      }, 100));
    }

    this.setState({ shift: newShift });
  };

  setCaruselIsInfinity = () => {
    const { images, frameSize } = this.props;

    const imagesClone: string[] = [...images];

    imagesClone.unshift(...images.slice(-frameSize));
    imagesClone.push(...images.slice(0, frameSize));

    this.setState({ images: imagesClone });
  };

  render() {
    const { itemWidth, frameSize } = this.props;
    const { images, animationDuration, shift } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: frameSize * itemWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${shift}px)`,
            transition: `transform ${animationDuration}ms`,
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

        <button type="button" onClick={this.prevButton}>
          Prev
        </button>

        <button type="button" onClick={this.nextButton}>
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
