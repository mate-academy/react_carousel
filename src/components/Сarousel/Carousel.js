import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    moveIndex: 0,
  };

  moveBack = () => {
    const { step, roots, infinite, frameSize } = this.props;
    const imgNumber = roots.length;

    this.setState(({ moveIndex }) => {
      let currentMove = moveIndex - step;

      if (moveIndex === 0 && infinite) {
        currentMove = imgNumber - frameSize;
      }

      if (currentMove < 0) {
        currentMove = 0;
      }

      return { moveIndex: currentMove };
    });
  };

  moveForward = () => {
    const { step, roots, frameSize, infinite } = this.props;
    const imgNumber = roots.length;
    const maxMoveIndex = imgNumber - frameSize;

    this.setState(({ moveIndex }) => {
      let currentMove = moveIndex + step;

      if (moveIndex === maxMoveIndex && infinite) {
        currentMove = 0;
      }

      if (currentMove > maxMoveIndex) {
        currentMove = maxMoveIndex;
      }

      return { moveIndex: currentMove };
    });
  };

  render() {
    const { roots, itemWidth, frameSize, animationDuration } = this.props;
    const { moveIndex } = this.state;

    const frameWidth = itemWidth * frameSize;
    const frameStyle = {
      width: `${frameWidth}px`,
      height: `${itemWidth}px`,
    };
    const imgStyle = {
      width: `${itemWidth}px`,
    };
    const listStyle = {
      transition: `transform ${animationDuration}ms`,
      transform: `translateX(-${moveIndex * itemWidth}px)`,
    };

    return (
      <div className="carousel">
        <div
          className="frame"
          style={frameStyle}
        >
          <ul
            className="carousel_list"
            style={listStyle}
          >
            {roots.map(root => (
              <li key={root} className="carousel_item">
                <img
                  src={root}
                  alt="emoji"
                  className="carousel_img"
                  style={imgStyle}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="button_wrapper">
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <button
            className="button"
            type="button"
            onClick={this.moveBack}
          >
            👈
          </button>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <button
            className="button"
            type="button"
            onClick={this.moveForward}
          >
            👉
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  roots: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
