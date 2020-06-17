import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import { CarouselList } from './CarouselList';
import { CarouselButtons } from './CarouselButtons';

class Carousel extends React.Component {
  state = {
    translate: 0,
    width: this.props.itemWidth * this.props.step,
    frameWidth: this.props.itemWidth * this.props.frameSize,
  }

  move = (prevTranslate, side) => {
    const max = this.props.itemWidth
      * this.props.images.length - this.state.width;

    const translate = prevTranslate
      + (side ? this.state.frameWidth : -this.state.frameWidth);

    if (translate > max) {
      return max;
    }

    if (translate < 0) {
      return 0;
    }

    return translate;
  }

  handleClick = (side = true) => {
    this.setState(prevState => ({
      translate: this.move(prevState.translate, side),
    }));
  }

  render() {
    return (
      <div
        className="Carousel"
        style={{ width: this.state.width }}
      >
        <CarouselList
          images={this.props.images}
          translate={this.state.translate}
          animationDuration={this.props.animationDuration}
          width={this.props.itemWidth}
        />
        <CarouselButtons handleClick={this.handleClick} />
      </div>
    );
  }
}

export default Carousel;

Carousel.defaultProps = {
  step: 3,
  animationDuration: 1000,
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number,
};
