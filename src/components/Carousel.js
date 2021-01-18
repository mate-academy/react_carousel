import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    position: 0,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    maxPosition: this.props.itemWidth * this.props.images.length
      - this.props.itemWidth * this.props.frameSize,
  }

  nextImage = () => {
    this.setState(({ infinite,
      position,
      itemWidth,
      frameSize,
      step,
      maxPosition }) => ({
      position: infinite === true
      && position === -maxPosition
        ? 0
        : Math.max((position - itemWidth * frameSize), -itemWidth
          * (this.props.images.length - step)),
    }));
  }

  prevImage = () => {
    this.setState(({ infinite,
      position,
      itemWidth,
      frameSize,
      maxPosition }) => ({
      position: infinite === true
      && position === 0
        ? -maxPosition
        : Math.min(position + (itemWidth * frameSize), 0),
    }));
  }

  render() {
    const { frameSize, itemWidth, position, animationDuration } = this.state;
    const { images } = this.props;

    return (
      <div
        className="App__container"
        style={{
          width: `${frameSize * itemWidth + 65}px`,
        }}
      >
        <button
          type="button"
          className="button"
          onClick={this.prevImage}
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
          className="button"
          onClick={this.nextImage}
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
