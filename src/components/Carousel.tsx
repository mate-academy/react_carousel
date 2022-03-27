import classNames from 'classnames';
import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

interface State {
  scrollLeft: number
}

export class Carousel extends React.Component<Props, State> {
  state = {
    scrollLeft: 0,
  };

  scrollToLeft = () => {
    this.setState(state => {
      const { step, itemWidth } = this.props;

      let stepDistance = step * itemWidth;

      if (-state.scrollLeft < step * itemWidth) {
        stepDistance = -state.scrollLeft;
      }

      return {
        scrollLeft: state.scrollLeft + stepDistance,
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

      if (-state.scrollLeft > containerWidth - ((step + frameSize) * itemWidth)) {
        stepDistance = containerWidth + state.scrollLeft - frameSize * itemWidth;
      }

      return {
        scrollLeft: state.scrollLeft - stepDistance,
      };
    });
  };

  render() {
    const { scrollLeft } = this.state;
    const {
      images, frameSize, itemWidth, animationDuration, infinite,
    } = this.props;

    const carouselStyle = {
      width: `${frameSize * itemWidth}px`,
    };

    if (infinite) {
      // const containerWidth = itemWidth * images.length;
    }

    const listStyle = {
      transform: `translateX(${scrollLeft}px)`,
      transition: `transform ${animationDuration}ms`,
    };

    return (
      <div style={carouselStyle} className="Carousel">
        <ul style={listStyle} className="Carousel__list">
          {images.map((image, index: number) => (
            <li key={image}><img src={image} alt={(index + 1).toString()} /></li>
          ))}
        </ul>

        <div className="button-wrapper">
          <button
            className={classNames('button-arrow', { buttonDisabled: scrollLeft === 0 })}
            type="button"
            disabled={scrollLeft === 0}
            onClick={this.scrollToLeft}
          >
            {'<'}
          </button>

          <button
            className={classNames('button-arrow', {
              buttonDisabled: scrollLeft === -(itemWidth * images.length - (frameSize * itemWidth)),
            })}
            type="button"
            disabled={scrollLeft === -(itemWidth * images.length - (frameSize * itemWidth))}
            onClick={this.scrollToRight}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
