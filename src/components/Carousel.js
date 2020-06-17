import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import { CarouselList } from './CarouselList';
import { CarouselButtons } from './CarouselButtons';

class Carousel extends React.Component {
  state = {
    translate: 0,
    width: this.props.itemWidth * this.props.step,
  }

  move = (side = true) => {
    const max = this.props.itemWidth
        * this.props.images.length - this.state.width;

    const moveRight = (prevTranslate) => {
      const translate = prevTranslate
       + this.props.frameSize * this.props.itemWidth;

      return translate > max ? max : translate;
    };

    const moveLeft = (prevTranslate) => {
      const translate = prevTranslate
        - this.props.frameSize * this.props.itemWidth;

      return translate < 0 ? 0 : translate;
    };

    this.setState(prevState => ({
      translate: side
        ? moveRight(prevState.translate)
        : moveLeft(prevState.translate),
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
        <CarouselButtons move={this.move} />
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
