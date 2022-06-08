import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
}

interface State {
  swipeDistance: number
}

export class Carousel extends React.Component<Props, State> {
  state = {
    swipeDistance: 0,
  };

  scrollToLeft = () => {
    this.setState(state => {
      const { step, itemWidth } = this.props;

      let stepDistance = step * itemWidth;

      const isBeforeTheLeftEdge = -state.swipeDistance < stepDistance;

      if (isBeforeTheLeftEdge) {
        stepDistance = -state.swipeDistance;
      }

      return {
        swipeDistance: state.swipeDistance + stepDistance,
      };
    });
  };

  scrollToRight = () => {
    this.setState(state => {
      const {
        images, step, frameSize, itemWidth,
      } = this.props;

      let stepDistance = step * itemWidth;

      const containerWidth = itemWidth * images.length;

      const isAfterTheRightEdge = -state.swipeDistance
        > containerWidth - ((step + frameSize) * itemWidth);

      const onRightEdge = containerWidth + state.swipeDistance - frameSize * itemWidth;

      if (isAfterTheRightEdge) {
        stepDistance = onRightEdge;
      }

      return {
        swipeDistance: state.swipeDistance - stepDistance,
      };
    });
  };

  render() {
    const { swipeDistance } = this.state;
    const {
      images, frameSize, itemWidth, animationDuration,
    } = this.props;

    const isOnRightEdge = swipeDistance === -(itemWidth * images.length - (frameSize * itemWidth));

    const carouselStyle = {
      width: `${frameSize * itemWidth}px`,
    };

    const listStyle = {
      width: `${itemWidth * images.length}px`,
      transform: `translateX(${swipeDistance}px)`,
      transition: `transform ${animationDuration}ms`,
    };

    return (
      <div style={carouselStyle} className="Carousel">
        <ul style={listStyle} className="Carousel__list">
          {images.map((image, index: number) => (
            <li key={image}>
              <img src={image} alt={(index + 1).toString()} />
            </li>
          ))}
        </ul>

        <div className="button-wrapper">
          <button
            className="button-arrow"
            type="button"
            disabled={swipeDistance === 0}
            onClick={this.scrollToLeft}
          >
            {'<'}
          </button>

          <button
            className="button-arrow"
            type="button"
            disabled={isOnRightEdge}
            onClick={this.scrollToRight}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
