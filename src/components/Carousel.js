import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Carousel extends PureComponent {
  state = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    position: 0,
  }

  swipeImages = (direction) => {
    this.setState(() => {
      const { step, itemWidth, frameSize, infinite } = this.props;
      const { images } = this.state;
      const stepWidth = itemWidth * step;
      const frameWidth = itemWidth * frameSize;
      const carouselWidth = itemWidth * images.length;
      const maxPosition = frameWidth - carouselWidth;

      if (direction === 'prev') {
        this.setState((state) => {
          const { position } = state;

          if (position + stepWidth > 0) {
            if (infinite && position === 0) {
              return { position: maxPosition };
            }

            return { position: 0 };
          }

          return { position: position + (step * itemWidth) };
        });
      } else {
        this.setState((state) => {
          const { position } = state;

          if (position - (step * itemWidth) < maxPosition) {
            if (infinite && position === maxPosition) {
              return { position: 0 };
            }

            return { position: maxPosition };
          }

          return { position: position - (step * itemWidth) };
        });
      }
    });
  };

  render() {
    const { position, images } = this.state;
    const { frameSize, itemWidth, animationDuration } = this.props;

    return (
      <div className="Carousel">
        <button
          type="button"
          onClick={() => this.swipeImages('prev')}
        >
          <img
            src="./img/prev.png"
            width="10px"
            height="10px"
            alt="next arrow"
          />
        </button>
        <div
          className="container"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${position}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((url) => {
              const imgId = /\d+/.exec(url);

              return (
                <li key={imgId}>
                  <img
                    style={{ width: `${itemWidth}px` }}
                    src={url}
                    alt={imgId}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => this.swipeImages('next')}
        >
          <img
            src="./img/next.png"
            width="10px"
            height="10px"
            alt="next arrow"
          />
        </button>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};
