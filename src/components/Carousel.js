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
    images: this.props.images,
    maxTranslate: this.props.itemWidth
      * (this.props.images.length - this.props.step),
    minTranslate: 0,
    marginLeft: 0,
  }

  images = this.props.images;

  getTranslateFinite = (translate) => {
    if (translate > this.state.maxTranslate) {
      return this.state.maxTranslate;
    }

    if (translate < 0) {
      return 0;
    }

    return translate;
  }

  getTranslateInfinite = (translate) => {
    if (translate > this.state.maxTranslate) {
      this.setState(prevState => ({
        images: [
          ...prevState.images.filter(
            (image, index) => index > this.props.frameSize - 1,
          ),
          ...prevState.images.filter(
            (image, index) => index < this.props.frameSize,
          ),
        ],
        marginLeft: prevState.marginLeft + prevState.frameWidth,
        maxTranslate: prevState.maxTranslate + prevState.frameWidth,
        minTranslate: prevState.minTranslate + prevState.frameWidth,
      }));
    }

    if (translate < this.state.minTranslate) {
      this.setState(prevState => ({
        images: [
          ...prevState.images.filter((image, index) => (
            index > prevState.images.length - this.props.frameSize - 1
          )),
          ...prevState.images.filter((image, index) => (
            index < prevState.images.length - this.props.frameSize
          )),
        ],
        marginLeft: prevState.marginLeft - prevState.frameWidth,
        maxTranslate: prevState.maxTranslate - prevState.frameWidth,
        minTranslate: prevState.minTranslate - prevState.frameWidth,
      }));
    }

    return translate;
  }

  handleClick = (side = true) => {
    const unCheckedTranslate = this.state.translate
      + (side ? this.state.frameWidth : -this.state.frameWidth);

    const translate = !this.props.infinite
      ? this.getTranslateInfinite(unCheckedTranslate)
      : this.getTranslateFinite(unCheckedTranslate);

    this.setState(prevState => ({ translate }));
  }

  render() {
    return (
      <div
        className="Carousel"
        style={{ width: this.state.width }}
      >
        <CarouselList
          images={this.state.images}
          translate={this.state.translate}
          animationDuration={this.props.animationDuration}
          width={this.props.itemWidth}
          marginLeft={this.state.marginLeft}
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
  infinite: false,
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
};
