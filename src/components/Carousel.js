import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    currentIdx: 0,
    imageCount: 0,
    nextButtonDisabled: false,
    prevButtonDisabled: true,
  };

  componentDidMount() {
    const { images } = this.props;

    this.setState({
      imageCount: images.length,
      prevButtonDisabled: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.frameSize !== this.props.frameSize) {
      this.updateButtonsState();
    }
  }

  updateButtonsState = () => {
    const { frameSize } = this.props;

    this.setState((state) => {
      const nextButtonDisabled = state.currentIdx === (
        state.imageCount - frameSize
      );
      const prevButtonDisabled = state.currentIdx <= 0;

      return {
        nextButtonDisabled,
        prevButtonDisabled,
      };
    });
  };

  toNextSmile = () => {
    const { step, frameSize } = this.props;

    this.setState((state) => {
      let currentIdx = state.currentIdx + step;

      if (currentIdx >= (state.imageCount - frameSize)) {
        currentIdx = state.imageCount - frameSize;
      }

      return {
        currentIdx,
      };
    });

    this.updateButtonsState();
  };

  toPreviousSmile = () => {
    const { step } = this.props;

    this.setState((state) => {
      const currentIdx = state.currentIdx === 0
        ? state.currentIdx
        : state.currentIdx - step;

      return {
        currentIdx: currentIdx < 0 ? 0 : currentIdx,
      };
    });

    this.updateButtonsState();
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const {
      currentIdx,
      nextButtonDisabled,
      prevButtonDisabled,
    } = this.state;

    const carouselWidth = itemWidth * (
      images.length < frameSize ? images.length : frameSize
    );

    return (
      <div className="CarouselContainer">
        <button
          type="button"
          className="Carousel__button"
          onClick={this.toPreviousSmile}
          disabled={prevButtonDisabled}
        >
          Prev
        </button>

        <div className="Carousel" style={{ width: carouselWidth }}>
          <ul
            className="Carousel__list"
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
        </div>

        <button
          type="button"
          className="Carousel__button"
          onClick={this.toNextSmile}
          disabled={nextButtonDisabled}
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
};

Carousel.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
};

export default Carousel;
