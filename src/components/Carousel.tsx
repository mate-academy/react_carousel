import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

interface State {
  position: number;
}

export class Carousel extends Component<Props, State> {
  state: State = {
    position: 0,
  };

  nextImage = () => {
    const {
      images,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;
    const { position } = this.state;
    const maxWidth = (images.length - frameSize) * itemWidth;
    const stepSum = this.props.step * itemWidth;

    if (position - itemWidth * this.props.step < -maxWidth) {
      this.setState({ position: -maxWidth });
    } else {
      this.setState({ position: position - stepSum });
    }

    if (position === -maxWidth && infinite) {
      this.setState({ position: 0 });
    }
  };

  prevImage = () => {
    const { position } = this.state;
    const stepSum = this.props.step * this.props.itemWidth;

    if (position + stepSum > 0) {
      this.setState({ position: 0 });
    } else {
      this.setState({ position: position + stepSum });
    }

    const {
      images,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;
    const maxWidth = (images.length - frameSize) * itemWidth;

    if (position === 0 && infinite) {
      this.setState({ position: -maxWidth });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;
    const { position } = this.state;

    const carouselTransform = {
      transform: `translateX(${position}px)`,
      transition: `transform ${animationDuration}ms`,
    };

    const containerWidth = { width: `${itemWidth * frameSize}px` };
    const imgWidth = { width: `${itemWidth}px` };
    const isDisabledPrev = position >= 0 && !this.props.infinite;
    const isDisabledNext = position <= -(images.length - frameSize)
       * itemWidth && !this.props.infinite;

    return (
      <div className="Carousel">
        <div className="Carousel_container" style={containerWidth}>
          <ul className="Carousel_list" style={carouselTransform}>
            {images.map((image) => (
              <li className="Carousel_item" key={image}>
                <img
                  className="Carousel_img"
                  alt={image}
                  src={image}
                  style={imgWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel_buttons">
          <button
            type="button"
            className="Carousel_button"
            onClick={this.prevImage}
            disabled={isDisabledPrev}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel_button"
            onClick={this.nextImage}
            data-cy="next"
            disabled={isDisabledNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
