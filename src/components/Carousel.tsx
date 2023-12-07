import { Component } from 'react';
import './Carousel.scss';

import { CarouselProps, CarouselState } from '../types';

class Carousel extends Component<CarouselProps, CarouselState> {
  state = {
    images: this.props.images,
    position: 0,
  };

  goToNext = () => {
    const {
      step, itemWidth, frameSize, infinite,
    } = this.props;
    const { position, images } = this.state;
    const lastItem = -(images.length * itemWidth - frameSize * itemWidth);
    let newPosition = position - (step * itemWidth);

    if (newPosition < lastItem) {
      newPosition = lastItem;
    }

    if (infinite && position === lastItem) {
      newPosition = 0;
    }

    this.setState({ position: newPosition });
  };

  goToPrev = () => {
    const {
      step, itemWidth, frameSize, infinite,
    } = this.props;
    const { position, images } = this.state;
    const lastItem = -(images.length * itemWidth - frameSize * itemWidth);
    let newPosition = position + (step * itemWidth);

    if (newPosition > 0) {
      newPosition = 0;
    }

    if (infinite && position === 0) {
      newPosition = lastItem;
    }

    this.setState({ position: newPosition });
  };

  render() {
    const {
      itemWidth, frameSize, images, infinite, animationDuration,
    } = this.props;
    const { position } = this.state;

    const carouselListStyle = {
      transform: `translateX(${position}px)`,
      transition: `transform ${animationDuration / 1000}s ease-in-out`,
    };
    const carouselStyle = { width: itemWidth * frameSize };

    const prevIsDisabled = (!infinite && position === 0)
      ? 'isDisabled'
      : undefined;

    const lastItem = -(images.length * itemWidth - frameSize * itemWidth);
    const nextIsDisabled = (!infinite && position === lastItem)
      ? 'isDisabled'
      : undefined;

    return (
      <div className="Carousel" style={carouselStyle}>
        <ul className="Carousel__list" style={carouselListStyle}>
          {
            images.map(image => (
              <li key={image}>
                <img src={image} alt={image} style={{ width: itemWidth }} />
              </li>
            ))
          }
          {/* <li><img src="./img/1.png" alt="1" /></li> */}
        </ul>

        <div className="controls">
          <button
            type="button"
            className={prevIsDisabled}
            onClick={this.goToPrev}
          >
            Prev
          </button>

          <button
            type="button"
            className={nextIsDisabled}
            onClick={this.goToNext}
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
