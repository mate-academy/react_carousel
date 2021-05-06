import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    width: `${this.props.itemWidth * this.props.frameSize}px`,
    translateX: 0,
    leftButton: 'true',
    rightButton: '',
  }

  slideRight = (step, frame, translateX, itemWidth) => {
    if (translateX + step * itemWidth
      < 1300 - frame * itemWidth) {
      this.setState(state => ({
        translateX: state.translateX + step * itemWidth,
        leftButton: '',
      }));
    } else {
      this.setState({
        translateX: 1300 - frame * itemWidth,
        rightButton: 'true',
      });
    }
  }

  slideLeft = (step, translateX, itemWidth) => {
    if (translateX
      > step * itemWidth) {
      this.setState(state => ({
        translateX: state.translateX - step * itemWidth,
        rightButton: '',
      }));
    } else {
      this.setState({
        translateX: 0,
        leftButton: 'true',
      });
    }
  }

  render() {
    const { width, translateX, leftButton, rightButton } = this.state;
    const { step, frameSize, itemWidth, animationDuration } = this.props;

    return (
      <div className="Carousel">
        <div style={{ width: `${width}` }} className="focus">
          <ul
            style={{
              transform: `translateX(-${translateX}px)`,
              transition: `${animationDuration}ms`,
            }}
            className="Carousel__list"
          >
            {this.props.images.map((image, index) => (
              <li key={image}>
                <img src={image} alt={index + 1} />
              </li>
            ))}

          </ul>
        </div>
        <button
          style={{ left: `${855 - itemWidth * frameSize / 2}px` }}
          className="prev"
          disabled={leftButton}
          type="button"
          onClick={() => (
            this.slideLeft(step, translateX, itemWidth)
          )}
        >
          ←
        </button>
        <button
          style={{ left: `${1008 + itemWidth * frameSize / 2}px` }}
          className="next"
          disabled={rightButton}
          type="button"
          onClick={() => (
            this.slideRight(step, frameSize, translateX, itemWidth)
          )}
        >
          →
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
