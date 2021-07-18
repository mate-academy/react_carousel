import React from 'react';
import PropTypes from 'prop-types';
import Button from './button/Button';
import Range from './range/Range';
import Checkbox from './input/Checkbox';
import Image from './image/Image';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    width: this.props.width,
    left: this.props.left,
    numberOfImage: this.props.numberOfImage,
    step: this.props.step,
    duration: this.props.duration,
    infinity: this.props.infinity,
  }

  leftMoving = function Left(prevState) {
    if (prevState.left === 0) {
      return this.state.infinity ? ({
        left:
          -(prevState.width * (10 - this.state.numberOfImage)),
      }) : null;
    }

    const move = prevState.width * prevState.step;

    return ({
      left:
      prevState.left + move > 0
        ? 0 : prevState.left + move,
    });
  };

  rightMoving = function right(prevState) {
    if (prevState.left
      === -(prevState.width * (10 - this.state.numberOfImage))
    ) {
      return this.state.infinity ? ({
        left: 0,
      }) : null;
    }

    const move = prevState.width * prevState.step;

    return ({
      left:
      prevState.left - move < -prevState.width * 7
        ? -prevState.width * 7 : prevState.left - move,
    });
  };

  moveLeft = () => this.setState(prevState => this.leftMoving(prevState));

  moveRight = () => this.setState(prevState => this.rightMoving(prevState));

  deleteImage = () => this.setState(prevState => (
    prevState.numberOfImage === 1
      ? null
      : {
        numberOfImage: prevState.numberOfImage - 1,
      }
  ))

  addImage = () => this.setState(prevState => (
    prevState.numberOfImage === 10
      ? null
      : {
        numberOfImage: prevState.numberOfImage + 1,
      }
  ))

  changeStep = (event) => {
    this.setState({
      step: event.target.value,
    });
  }

  changeImageWidth = (event) => {
    this.setState({
      width: event.target.value,
      left: 0,
    });
  }

  changeDuration = (event) => {
    this.setState({
      duration: event.target.value,
    });
  }

  isInfinity = () => this.setState(prevState => ({
    infinity: !prevState.infinity,
  }))

  render() {
    const { width, step, numberOfImage, duration, left } = this.state;

    return (
      <ul>
        <li
          className="carousel"
          style={{ width: `${width * numberOfImage}px` }}
          ref={this.ref}
        >
          <div
            className="carousel__image-container"
            style={{
              left: `${left}px`,
              transitionDuration: `${duration * 1000}ms`,
            }}
          >
            {this.props.images.map(image => (
              <Image
                key={image}
                src={image}
                style={{ height: `${width}px` }}
              />
            ))
          }
          </div>
        </li>
        <li className="carousel__button-container">
          <Button
            action={this.moveLeft}
            text="Prev"
          />
          <Button
            action={this.moveRight}
            text="Next"
          />
        </li>
        <li className="carousel__button-container">
          Sum of images:
          {' '}
          <strong>{ numberOfImage }</strong>
          <Button
            action={this.deleteImage}
            text="-"
          />
          <Button
            action={this.addImage}
            text="+"
          />
        </li>
        <li
          className="carousel__button-container"
        >
          Change step:
          {' '}
          {step}
          <Range
            max="5"
            min="1"
            value={step}
            action={this.changeStep}
          />
        </li>
        <li
          className="carousel__button-container"
        >
          Change image width:
          {' '}
          {width}
          <Range
            max="250"
            min="130"
            value={width}
            action={this.changeImageWidth}
          />
        </li>
        <li
          className="carousel__button-container"
        >
          Change duration:
          {' '}
          {duration}
          {' '}
          s
          <Range
            max="50"
            min="1"
            value={duration}
            action={this.changeDuration}
          />
        </li>
        <li className="carousel__button-container">
          <Checkbox
            action={this.isInfinity}
          />
        </li>
      </ul>
    );
  }
}

Carousel.defaultProps = {
  width: 130,
  left: 0,
  numberOfImage: 3,
  step: 1,
  duration: 1,
  infinity: false,
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  width: PropTypes.number,
  left: PropTypes.number,
  numberOfImage: PropTypes.number,
  step: PropTypes.number,
  duration: PropTypes.number,
  infinity: PropTypes.bool,
};

export default Carousel;
