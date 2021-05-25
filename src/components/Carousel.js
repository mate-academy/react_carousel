import React from 'react';
import PropTypes, { string } from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    direction: 'right',
    left: 0,
  }

  carousel;

  carouselWrapper;

  timer;

  frameWidth = this.props.frameSize * this.props.itemWidth;

  step = this.props.step * this.props.itemWidth;

  maxTransition = this.props.imgList.length * this.props.itemWidth
    - this.frameWidth;

  componentDidMount() {
    this.carousel = document.querySelector('.Carousel__list');
    this.carouselWrapper = document.querySelector('.Carousel__wrapper');
    this.carouselWrapper.style.width = `${this.frameWidth}px`;
    this.carousel.style.transition
      = `${this.props.animationDuration}ms ease-in-out`;

    if (this.props.infinite) {
      this.timer = setInterval(this.animation, this.props.animationDuration);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  rightMove = () => {
    if (this.state.left - this.step > -this.maxTransition) {
      this.carousel.style.marginLeft = `${this.state.left - this.step}px`;
      this.setState(state => ({ left: state.left - this.step }));
    } else {
      this.carousel.style.marginLeft = `${-this.maxTransition}px`;
      this.setState({ left: -this.maxTransition });
    }
  }

  leftMove = () => {
    if (this.state.left + this.step < 0) {
      this.carousel.style.marginLeft = `${this.state.left + this.step}px`;
      this.setState(state => ({ left: state.left + this.step }));
    } else {
      this.carousel.style.marginLeft = `0px`;
      this.setState({ left: 0 });
    }
  }

  animation = () => {
    if (this.state.left === 0) {
      this.setState({ direction: 'right' });
    }

    if (this.state.left === -this.maxTransition) {
      this.setState({ direction: 'left' });
    }

    if (this.state.direction === 'right') {
      this.rightMove();
    }

    if (this.state.direction === 'left') {
      this.leftMove();
    }
  }

  render() {
    return (
      <div className="Carousel">
        <div
          width={this.props.itemWidth * this.props.frameSize}
          className="Carousel__wrapper"
        >
          <ul className="Carousel__list">
            {this.props.imgList.map((img, index) => (
              <li
                className="Carousel__item"
                key={img}
              >
                <img
                  width={this.props.itemWidth}
                  height={this.props.itemWidth}
                  src={img}
                  className="Carousel__img"
                  alt={`emoji-${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={this.leftMove}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.rightMove}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  imgList: PropTypes.arrayOf(string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export default Carousel;
