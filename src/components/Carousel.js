import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    currentPosition: 0,
  }

  handlePrev = () => {
    const {
      itemWidth,
      step,
    } = this.props;

    const { currentPosition } = this.state;

    if (currentPosition >= 0) {
      this.setState({
        currentPosition: 0,
      });
    }

    this.setState(prevState => ({
      currentPosition: Math.min(
        prevState.currentPosition + itemWidth * step, 0,
      ),
    }));
  }

  handleNext = () => {
    const {
      itemWidth,
      images,
      step,
      frameSize,
    } = this.props;

    const { currentPosition } = this.state;

    const maxWidth = images.length * itemWidth - (frameSize * itemWidth);

    if (currentPosition >= maxWidth) {
      this.setState({
        currentPosition: -maxWidth,
      });
    }

    this.setState(prevState => ({
      currentPosition: Math.max(
        prevState.currentPosition - itemWidth * step,
        -itemWidth * (images.length - step),
      ),
    }));
  }

  render() {
    const {
      images,
      itemWidth,
      frameSize: framesize,
      animationDuration,
    } = this.props;

    const { currentPosition } = this.state;

    const style = {
      transition: `transform ${animationDuration}ms`,
      transform: `TranslateX(${currentPosition}px)`,
    };

    const width = {
      width: `${itemWidth * framesize}px`,
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
