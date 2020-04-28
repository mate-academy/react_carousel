import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.css';

import { CarouselList } from '../CarouselList/CarouselList';

class Carousel extends React.Component {
  count = 0;

  state = {
    marginLeft: 0,
  }

  prevImgs = () => {
    const { step, itemWidth, frameSize, images, infinite } = this.props;

    if (infinite && this.count === 0) {
      this.count = images.length - frameSize;
    } else {
      this.count -= step;
    }

    if (this.count < 0) {
      this.count = 0;
    }

    this.setState({
      marginLeft: itemWidth * this.count,
    });
  }

  nextImgs = () => {
    const { step, itemWidth, frameSize, images, infinite } = this.props;

    if (infinite && this.count === images.length - frameSize) {
      this.count = 0;
    } else {
      this.count += step;
    }

    if (this.count > images.length - frameSize) {
      this.count = images.length - frameSize;
    }

    this.setState({
      marginLeft: itemWidth * this.count,
    });
  }

  render() {
    const { images, itemWidth, frameSize, animationDuration } = this.props;
    const { marginLeft } = this.state;

    return (
      <div className="Carousel">
        <button
          onClick={this.prevImgs}
          type="button"
        >
          ⇦
        </button>

        <div
          className="Carousel__wrap"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <CarouselList
            animationDuration={animationDuration}
            images={images}
            itemWidth={itemWidth}
            marginLeft={marginLeft}
          />
        </div>

        <button
          onClick={this.nextImgs}
          type="button"
        >
          ⇨
        </button>
      </div>
    );
  }
}

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
};

export default Carousel;
