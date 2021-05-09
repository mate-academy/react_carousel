import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    currentIdx: 0,
    imageCount: 0,
  };

  componentDidMount() {
    const { images } = this.props;

    this.setState({
      imageCount: images.length,
    });
  }

  nextFrame = () => {
    const { step, frameSize } = this.props;

    this.setState((state) => {
      let currentIdx = state.currentIdx + step;

      if (currentIdx >= (state.imageCount - frameSize)) {
        currentIdx = state.imageCount - frameSize;
      }

      return { currentIdx };
    });
  };

  previousFrame = () => {
    const { step } = this.props;

    this.setState((state) => {
      const currentIdx = state.currentIdx === 0
        ? state.currentIdx
        : state.currentIdx - step;

      return {
        currentIdx: currentIdx < 0 ? 0 : currentIdx,
      };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const { currentIdx } = this.state;
    const carouselWidth = itemWidth * (
      images.length < frameSize ? images.length : frameSize
    );
    const listStyle = {
      width: carouselWidth,
    };

    return (
      <div className="Carousel">
        <button
          type="button"
          onClick={this.previousFrame}
        >
          Prev
        </button>

        <ul
          className="Carousel__list"
          style={listStyle}
        >
          {
            images.map((image) => {
              const key = +image.replace(/\D/g, '');
              const listItemStyle = {
                transitionDuration: `${animationDuration}ms`,
                transform: `translateX(-${currentIdx * itemWidth}px)`,
              };
              const imgStyle = {
                width: `${itemWidth}px`,
              };

              return (
                <li
                  key={key}
                  className="Carousel__item"
                  style={listItemStyle}
                >
                  <img
                    className="Carousel__image"
                    src={image}
                    alt={key}
                    style={imgStyle}
                  />
                </li>
              );
            })
          }
        </ul>

        <button
          type="button"
          onClick={this.nextFrame}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number,
  frameSize: PropTypes.number,
  step: PropTypes.number,
  animationDuration: PropTypes.number,
  // infinite: PropTypes.bool,
};

Carousel.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  // infinite: false,
};

export default Carousel;
