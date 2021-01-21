import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    position: 0,
  }

  prevAndNextImage = (event) => {
    const { itemWidth, frameSize, step, infinite, images } = this.props;
    const maxPosition = itemWidth * images.length - itemWidth * frameSize;
    const { name } = event.target;

    if (name === 'next') {
      this.setState(({ position }) => ({
        position: infinite === true
        && position === -maxPosition
          ? 0
          : Math.max((position - step * itemWidth), -itemWidth
            * (images.length - step)),
      }));
    } else {
      this.setState(({ position }) => ({
        position: infinite === true
        && position === 0
          ? -maxPosition
          : Math.min(position + (step * itemWidth), 0),
      }));
    }
  }

  render() {
    const { frameSize, itemWidth, images, animationDuration } = this.props;
    const { position } = this.state;

    return (
      <div
        className="App__container"
        style={{
          width: `${frameSize * itemWidth + 65}px`,
        }}
      >
        <button
          type="button"
          name="prev"
          className="button"
          onClick={this.prevAndNextImage}
        >
          &#8656;
        </button>

        <div
          className="Carousel"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              marginLeft: position,
              transitionDuration: `position ${animationDuration}s`,
            }}
          >
            {images.map((elem, index) => (
              <li
                key={elem + 1}
                className="Carousel__list-element"
              >
                <img
                  src={elem}
                  alt={index + 1}
                  className="Carousel__list-picture"
                />

                <span style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                }}
                >
                  {index + 1}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          name="next"
          className="button"
          onClick={this.prevAndNextImage}
        >
          &#8658;
        </button>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};
