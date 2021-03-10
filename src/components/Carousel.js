import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    images: this.props.images,
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    translateX: 0,
  }

  slideRight = () => {
    let { translateX } = this.state;
    const { images, itemWidth, step } = this.state;

    const maxWidth = images.length * itemWidth - itemWidth * 3;

    if (translateX >= maxWidth - itemWidth * 2) {
      this.setState({
        translateX: maxWidth,
      });
    } else {
      this.setState({
        translateX: translateX += itemWidth * step,
      });
    }
  }

  slideLeft = () => {
    let { translateX } = this.state;
    const { itemWidth, step } = this.state;

    if (translateX <= itemWidth * 3) {
      this.setState({
        translateX: 0,
      });
    } else {
      this.setState({
        translateX: translateX -= itemWidth * step,
      });
    }
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      translateX,
    } = this.state;

    const width = (itemWidth * frameSize);

    return (
      <div
        className="Carousel"
        style={{
          maxWidth: `${width}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={index}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <button type="button" onClick={this.slideLeft}>Prev</button>
        <button type="button" onClick={this.slideRight}>Next</button>
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
