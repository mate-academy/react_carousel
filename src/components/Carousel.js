import React from 'react';
import './Carousel.scss';
import Picture from './Picture';

/* class Carousel extends React.Component {
  state = {
    ...this.props,
    left: 0,
  };

  scrollLeft = () => {
    let newPosition = this.state.left;

    newPosition -= this.state.itemWidth * this.state.step;
    if (Math.abs(newPosition)
    >= (this.state.images.length - this.state.frameSize)
    * this.state.itemWidth) {
      newPosition = -(this.state.images.length - this.state.frameSize)
        * this.state.itemWidth;
    }

    this.setState({
      left: newPosition,
    });
  };

  scrollRight = () => {
    let newPosition = this.state.left;

    newPosition += this.state.itemWidth * this.state.step;

    if (newPosition > 0) {
      newPosition = 0;
    }

    this.setState({
      left: newPosition,
    });
  };

  render() {
    const carouselStyle = {
      width: this.state.itemWidth * this.state.frameSize,
      transition: this.state.animationDuration,
    };

    const carouselListStyle = {
      transform: `translateX(${this.state.left}px)`,
      transitionDuration: `${this.state.animationDuration}ms`,
    };

    return (
      <>
        <div className="Carousel" style={carouselStyle}>
          <ul className="Carousel__list" style={carouselListStyle}>
            {
              this.state.images.map(image => (
                <li key={image}>
                  <Picture image={image} width={this.state.itemWidth} />
                </li>
              ))
            }
          </ul>
        </div>
        <button
          type="button"
          onClick={this.scrollRight}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.scrollLeft}
        >
          Next
        </button>
      </>
    );
  }
}

export default Carousel; */

class Carousel extends React.Component {
  state = {
    ...this.props,
    left: 0,
  };

  scrollLeft = () => {
    const { images, frameSize, step, itemWidth, left } = this.state;
    let newPosition = left;

    newPosition -= itemWidth * step;

    if (Math.abs(newPosition) >= (images.length - frameSize) * itemWidth) {
      newPosition = -(images.length - frameSize) * itemWidth;
    }

    this.setState({
      left: newPosition,
    });
  };

  scrollRight = () => {
    const { itemWidth, step, left } = this.state;

    let newPosition = left;

    newPosition += itemWidth * step;

    if (newPosition > 0) {
      newPosition = 0;
    }

    this.setState({
      left: newPosition,
    });
  };

  render() {
    const { frameSize, itemWidth, animationDuration, left } = this.state;

    const carouselStyle = {
      width: itemWidth * frameSize,
      transition: animationDuration,
    };

    const carouselListStyle = {
      transform: `translateX(${left}px)`,
      transitionDuration: `${animationDuration}ms`,
    };

    return (
      <>
        <div className="Carousel" style={carouselStyle}>
          <ul className="Carousel__list" style={carouselListStyle}>
            {
              this.state.images.map(image => (
                <li key={image}>
                  <Picture image={image} width={itemWidth} />
                </li>
              ))
            }
          </ul>
        </div>
        <button
          type="button"
          onClick={this.scrollRight}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.scrollLeft}
        >
          Next
        </button>
      </>
    );
  }
}

export default Carousel;
