import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  isAnimation: boolean,
  shift: number,
  shiftInner: number,
}

type State = {
  animationDurationInner: number,
  isAnimationInner: boolean,
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    animationDurationInner: this.props.animationDuration,
    isAnimationInner: this.props.isAnimation,
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      shift,
      shiftInner,
      animationDuration,
      isAnimation,
    } = this.props;

    const { animationDurationInner, isAnimationInner } = this.state;

    return (
      <>
        <div
          className="carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
            height: `${itemWidth + 4}px`,
          }}
        >
          <div
            className="carousel__container"
            style={{
              transform: `translateX(${shift}px)`,
              transition: `transform ${isAnimation ? animationDuration : 0}ms`,
            }}
          >
            <div
              style={{
                transform: `translateX(${shiftInner}px`,
                transition: `transform ${isAnimationInner ? animationDurationInner : 0}ms`,
              }}
            >
              {images.map((image, index) => (
                <img
                  key={image + String(index)}
                  src={image}
                  alt={image}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Carousel;
