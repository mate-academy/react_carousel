import { Component } from 'react';
import './Carousel.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface State {
  images: string[],
  currentImage: number,
  forward: boolean,
  transition: boolean,
}

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export class Carousel extends Component<Props, State> {
  state = {
    images: this.props.images,
    currentImage: 0,
    transition: true,
    forward: false,
  };

  componentDidUpdate(prevProps: Readonly<Props>) {
    const { images, currentImage } = this.state;
    const { step, images: propsImages, infinite } = this.props;
    const { length } = images;

    if (
      infinite
      && infinite !== prevProps.infinite
      && currentImage + step >= this.lastImageIndex()
    ) {
      this.setState({
        images: [...images, ...images.slice(0, step)].slice(-length),
        currentImage: currentImage - step,
        transition: false,
      });
    } else if (
      infinite
      && infinite !== prevProps.infinite
    ) {
      this.setState({
        images: [...images.slice(length - step), ...images].slice(0, length),
        currentImage: currentImage + step,
        transition: false,
      });
    } else if (infinite !== prevProps.infinite) {
      this.setState({
        images: propsImages,
        currentImage: 0,
        transition: false,
      });
    }
  }

  moveTransitionEnd = () => {
    const { images, currentImage, forward } = this.state;
    const { step } = this.props;
    const { length } = images;

    let newImages: string[];
    let current: number;

    if (forward) {
      newImages = [...images, ...images.slice(0, step)].slice(-length);
      current = currentImage - step;
    } else {
      newImages = [...images.slice(length - step), ...images].slice(0, length);
      current = currentImage + step;
    }

    this.setState({
      images: newImages,
      currentImage: current,
      transition: false,
    });
  };

  handleMoveForward = () => {
    const { currentImage } = this.state;
    const { step, infinite } = this.props;
    const current = currentImage + step;

    if (infinite && current > this.lastImageIndex()) {
      return;
    }

    this.setState({
      currentImage: Math.min(current, this.lastImageIndex()),
      transition: true,
      forward: true,
    });
  };

  handleMoveBackward = () => {
    const { currentImage } = this.state;
    const { step, infinite } = this.props;
    const current = currentImage - step;

    if (infinite && current < 0) {
      return;
    }

    this.setState({
      currentImage: Math.max(current, 0),
      transition: true,
      forward: false,
    });
  };

  lastImageIndex = () => {
    const { step, frameSize } = this.props;
    const { images } = this.state;
    const different = Math.min(step, frameSize);

    return images.length - different;
  };

  render() {
    const {
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const {
      images,
      currentImage,
      transition,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{ maxWidth: `${frameSize * itemWidth}px` }}
      >
        <div
          className="Carousel__container"
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${images.length * itemWidth}px`,
              transform: `translateX(${-(currentImage * itemWidth)}px)`,
              transitionDuration: `${transition ? animationDuration : 0}ms`,
            }}
            onTransitionEnd={() => {
              if (infinite) {
                this.moveTransitionEnd();
              }
            }}
          >
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="Carousel__navigation">
          <button
            className="Carousel__button"
            type="button"
            disabled={!infinite && currentImage <= 0}
            onClick={this.handleMoveBackward}
          >
            <FaChevronLeft />
          </button>
          <button
            className="Carousel__button"
            type="button"
            data-cy="next"
            disabled={!infinite && currentImage >= this.lastImageIndex()}
            onClick={this.handleMoveForward}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    );
  }
}
