import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

import { CarouselControls } from '../CarouselControls/CarouselControls';
import { CarouselList } from '../CarouselList/CarouselList';

class Carousel extends React.Component {
  state = {
    scrollLeft: 0,
    imagesCount: 10,
    itemWidth: 130,
  }

  showedLast = false;

  showedFirst = false;

  imageWidth = 130;

  moveToNextFrame = () => {
    const { itemWidth, infinite, step, frameSize } = this.props;
    const { scrollLeft } = this.state;
    const carouselWidth = itemWidth * this.state.imagesCount;
    const maxScrollBy = carouselWidth - (itemWidth * frameSize);
    let scrollBy = scrollLeft + (itemWidth * step);

    if (scrollBy > maxScrollBy) {
      scrollBy = maxScrollBy;

      if (infinite) {
        if (this.showedLast || (scrollLeft === maxScrollBy)) {
          scrollBy = 0;
          this.showedLast = false;
        } else {
          this.showedLast = true;
        }
      }
    }

    this.setState({
      scrollLeft: scrollBy,
    });
  }

  moveToPrevFrame = () => {
    const { itemWidth, infinite, step, frameSize } = this.props;
    const { scrollLeft } = this.state;
    const carouselWidth = itemWidth * this.state.imagesCount;
    let scrollBy = scrollLeft - (itemWidth * step);

    if (scrollBy < 0) {
      scrollBy = 0;

      if (infinite) {
        if (this.showedFirst || (scrollLeft === 0)) {
          scrollBy = carouselWidth - -(scrollLeft - (itemWidth * frameSize));
          this.showedFirst = false;
        } else {
          this.showedFirst = true;
        }
      }
    }

    this.setState({
      scrollLeft: scrollBy,
    });
  }

  render() {
    const { itemWidth, images, animationDuration, frameSize } = this.props;
    const { scrollLeft } = this.state;

    if (itemWidth !== this.state.itemWidth) {
      this.setState({
        scrollLeft: 0,
        itemWidth,
      });
    }

    const carouselStyle = {
      width: `${itemWidth * frameSize}px`,
      height: `${itemWidth}px`,
      overflow: `hidden`,
    };
    const carouselListStyle = {
      transform: `translateX(-${scrollLeft}px)`,
      transitionDuration: `${animationDuration}ms`,
    };
    const imageStyle = {
      height: `${itemWidth}px`,
      width: `${itemWidth}px`,
    };

    return (
      <>
        <div
          className="Carousel"
        >
          <CarouselList
            carouselStyle={carouselStyle}
            carouselListStyle={carouselListStyle}
            images={images}
            imageStyle={imageStyle}
          />
        </div>
        <CarouselControls
          action={this.moveToPrevFrame}
          text="prev"
        />
        <CarouselControls
          action={this.moveToNextFrame}
          text="next"
        />
      </>
    );
  }
}

Carousel.propTypes = {
  step: PropTypes.number,
  itemWidth: PropTypes.number,
  frameSize: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Carousel.defaultProps = {
  step: 3,
  itemWidth: 130,
  frameSize: 3,
  animationDuration: 1000,
  infinite: false,
};

export default Carousel;
