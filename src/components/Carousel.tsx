import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number,
  infinite: boolean,
}

interface State {
  framesPosition: number,
  isAtMaxPosition: boolean,
  isAtMinPosition: boolean,
}

class Carousel extends React.Component<Props, State> {
  state: State = {
    framesPosition: 0,
    isAtMaxPosition: false,
    isAtMinPosition: true,
  };

  prev = () => {
    const {
      itemWidth,
      step,
      infinite,
      images,
      frameSize,
    } = this.props;

    const {
      framesPosition,
      isAtMinPosition,
    } = this.state;

    const maxFramesPosition = -((images.length * itemWidth) - (itemWidth * frameSize));

    const moveTo = framesPosition + (itemWidth * step);

    if (isAtMinPosition && infinite) {
      this.move(maxFramesPosition);
    } else {
      this.move(moveTo);
    }
  };

  next = () => {
    const {
      itemWidth,
      step,
      infinite,
    } = this.props;

    const {
      framesPosition,
      isAtMaxPosition,
    } = this.state;

    const moveTo = framesPosition - (itemWidth * step);

    if (isAtMaxPosition && infinite) {
      this.move(0);
    } else {
      this.move(moveTo);
    }
  };

  move(moveTo: number) {
    const {
      itemWidth,
      images,
      frameSize,
    } = this.props;

    const maxFramesPosition = -((images.length * itemWidth) - (itemWidth * frameSize));
    const minFramesPosition = 0;

    if (moveTo <= maxFramesPosition) {
      this.setState({
        framesPosition: maxFramesPosition,
        isAtMaxPosition: true,
        isAtMinPosition: false,
      });
    } else if (moveTo >= minFramesPosition) {
      this.setState({
        framesPosition: minFramesPosition,
        isAtMinPosition: true,
        isAtMaxPosition: false,
      });
    } else {
      this.setState({
        framesPosition: moveTo,
        isAtMaxPosition: false,
        isAtMinPosition: false,
      });
    }
  }

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.props;

    const {
      framesPosition,
      isAtMaxPosition,
      isAtMinPosition,
    } = this.state;

    const containerStyle = {
      width: itemWidth * frameSize,
    };

    const listStyle = {
      width: itemWidth * images.length,
      transitionDuration: `${animationDuration}ms`,
      transform: `translateX(${framesPosition}px)`,

    };

    const itemStyle = {
      width: itemWidth * frameSize,
      height: itemWidth,
    };

    const isNextDisabled = !infinite && isAtMaxPosition;
    const isPrevDisabled = !infinite && isAtMinPosition;

    return (
      <div className="Carousel">
        <div className="Carousel__container" style={containerStyle}>
          <ul className="Carousel__list block" style={listStyle}>
            {images.map(imgUrl => (
              <li
                key={imgUrl}
                className="Carousel__item"
                style={itemStyle}
              >
                <img src={imgUrl} alt="carousel item" className="Carousel__img" />
              </li>
            ))}
            {step}
            {infinite}
          </ul>
        </div>
        <button
          name="prev"
          onClick={this.prev}
          disabled={isPrevDisabled}
          type="button"
        >
          Prev
        </button>
        <button
          name="next"
          onClick={this.next}
          disabled={isNextDisabled}
          type="button"
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
