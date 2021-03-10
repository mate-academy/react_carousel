/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    images: this.props.images,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    translateX: 0,
  }

  handlePrev = () => {
    const {
      itemWidth,
      step,
      translateX,
    } = this.state;

    if (translateX >= 0) {
      this.setState({
        translateX: 0,
      });
    }

    this.setState(prevState => ({
      translateX: Math.min(prevState.translateX + itemWidth * step, 0),
    }));
  }

  handleNext = () => {
    const {
      itemWidth,
      images,
      step,
      frameSize,
      translateX,
    } = this.state;

    const maxWidth = images.length * itemWidth - (frameSize * itemWidth);

    if (translateX >= maxWidth) {
      this.setState({
        translateX: -maxWidth,
      });
    }

    this.setState(prevState => ({
      translateX: Math.max(
        prevState.translateX - itemWidth * step,
        -itemWidth * (images.length - step),
      ),
    }));
  }

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      translateX,
    } = this.state;

    const style = {
      transition: `transform ${animationDuration}ms`,
      transform: `translateX(${translateX}px)`,
    };

    const width = {
      /* stylelint-disable */
      width: `${itemWidth * frameSize}px`,
    };

    return (
      <div className="Carousel" style={width}>
        <ul className="Carousel__list" style={style}>
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={index}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>

        <button className="prev" type="button" onClick={this.handlePrev}>
          Prev
        </button>
        <button type="button" onClick={this.handleNext}>
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
