import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  imageWidth: number,
  visibleFrameOfBlockImages: number,
  animationDuration: number,
  isScrollAnimationOn: boolean,
  shiftBlockOfImages: number,
  shiftInnerBlockOfImages: number,
}

type State = {
  animationDurationInner: number,
  isScrollAnimationInnerOn: boolean,
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    animationDurationInner: this.props.animationDuration,
    isScrollAnimationInnerOn: this.props.isScrollAnimationOn,
  };

  render() {
    const {
      images,
      imageWidth,
      visibleFrameOfBlockImages,
      animationDuration,
      isScrollAnimationOn,
      shiftBlockOfImages,
      shiftInnerBlockOfImages,
    } = this.props;

    const { animationDurationInner, isScrollAnimationInnerOn } = this.state;

    return (
      <>
        <div
          className="carousel"
          style={{
            width: `${imageWidth * visibleFrameOfBlockImages}px`,
            height: `${imageWidth + 4}px`,
          }}
        >
          <div
            className="carousel__container"
            style={{
              transform: `translateX(${shiftBlockOfImages}px)`,
              transition: `transform ${isScrollAnimationOn ? animationDuration : 0}ms`,
            }}
          >
            <div
              style={{
                transform: `translateX(${shiftInnerBlockOfImages}px`,
                transition: `transform ${isScrollAnimationInnerOn ? animationDurationInner : 0}ms`,
              }}
            >
              {images.map((image, index) => (
                <img
                  key={image + String(index)}
                  src={image}
                  alt={image}
                  style={{
                    width: `${imageWidth}px`,
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
