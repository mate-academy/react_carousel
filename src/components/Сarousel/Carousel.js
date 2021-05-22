import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    moveIndex: 0,
    showImage: this.props.roots,
    correctionImage: 0,
    correctionMoveIndex: 0,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.infinite === true && this.props.infinite === false) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        showImage: this.props.roots,
        correctionImage: 0,
        moveIndex: 0,
        correctionMoveIndex: 0,
      });
    }
  }

  moveBack = () => {
    const { step, roots, infinite } = this.props;
    const imgNumber = roots.length;

    this.setState((state) => {
      const {
        showImage,
        correctionImage,
        moveIndex,
        correctionMoveIndex,
      } = state;
      let currentMove = moveIndex - step;

      if (currentMove + correctionMoveIndex < 0 && infinite) {
        return {
          showImage: [
            ...showImage.slice(imgNumber - step).reverse(),
            ...showImage.slice(0, imgNumber - step),
          ],
          moveIndex: moveIndex - step,
          correctionImage: correctionImage - step,
          correctionMoveIndex: correctionMoveIndex + step,
        };
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

    this.setState((state) => {
      const {
        moveIndex,
        correctionMoveIndex,
        showImage,
        correctionImage,
      } = state;
      let currentMove = moveIndex + step;

      if (currentMove + correctionMoveIndex > maxMoveIndex && infinite) {
        return {
          showImage: [
            ...showImage.slice(step),
            ...showImage.slice(0, step).reverse(),
          ],
          moveIndex: currentMove,
          correctionImage: correctionImage + step,
          correctionMoveIndex: correctionMoveIndex - step,
        };
      }

      if (currentMove > maxMoveIndex) {
        currentMove = maxMoveIndex;
      }

      return { moveIndex: currentMove };
    });
  };

  render() {
    const { itemWidth, frameSize, animationDuration } = this.props;
    const { moveIndex, showImage, correctionImage } = this.state;

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
      transform: `translateX(${-(moveIndex * itemWidth)}px)`,
      marginLeft: `${correctionImage * itemWidth}px`,
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
            {showImage.map(root => (
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
