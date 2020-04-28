import React from 'react';
import PropTypes from 'prop-types';

class Carousel extends React.Component {
  state = {
    left: 0,
  }

  moveRight = (event) => {
    const { step, itemWidth } = this.props;
    const { left } = this.state;
    let nextLeft;

    if (left + step * itemWidth > 0) {
      nextLeft = 0;
    } else {
      nextLeft = left + step * itemWidth;
    }

    this.setState({
      left: nextLeft,
    });
  }

  moveLeft = () => {
    const { images, step, itemWidth } = this.props;
    const { left } = this.state;
    let nextLeft;

    if (left - step * itemWidth < -(images.length - step) * itemWidth) {
      nextLeft = -(itemWidth * images.length - step * itemWidth);
    } else {
      nextLeft = left - step * itemWidth;
    }

    this.setState({
      left: nextLeft,
    });
  }

  render() {
    const { images,
      frameSize,
      itemWidth,
      animationDuration } = this.props;

    return (
      <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transition: `${animationDuration / 1000}s `,
            left: `${this.state.left}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img src={image} alt={index} />
            </li>
          ))}
        </ul>

        <button onClick={this.moveRight} type="button">Prev</button>
        <button onClick={this.moveLeft} type="button">Next</button>

      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
