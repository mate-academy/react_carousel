import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    translate: 0,
    gap: 20,
  };

  listSize = this.props.images.length * this.props.itemWidth
    + this.state.gap * this.props.images.length;

  carouselSize = this.props.frameSize * this.props.itemWidth
    + this.state.gap * this.props.frameSize;

  carouselStep = this.props.step * this.props.itemWidth
    + this.state.gap * this.props.step;

  maxscroll = this.listSize - this.carouselSize;

  scrollRight = () => {
    if (this.state.translate - this.carouselStep >= -this.maxscroll) {
      this.setState(prevState => ({
        translate: prevState.translate - this.carouselStep,
      }));
    } else {
      this.setState({ translate: -this.maxscroll });
    }
  }

  scrollLeft = () => {
    if (this.state.translate + this.carouselStep < 0) {
      this.setState(prevState => ({
        translate: prevState.translate + this.carouselStep,
      }));
    } else {
      this.setState({ translate: 0 });
    }
  }

  render() {
    const { translate, gap } = this.state;
    const { images, itemWidth, animationDuration } = this.props;
    const carouselStyle = {
      width: this.carouselSize,
    };
    const listStyle = {
      transform: `translateX(${translate}px)`,
      gap,
      transition: `transform ${animationDuration}ms`,
    };
    const buttonsStyle = {
      width: this.carouselSize - gap,
    };

    return (
      <div className="carousel" style={carouselStyle}>
        <ul
          className="carousel__list"
          style={listStyle}
        >
          {images.map(image => (
            <li className="carousel__item" key={image}>
              <img
                src={image}
                alt="1"
                height={itemWidth}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div
          className="carousel__buttons"
          style={buttonsStyle}
        >
          <button
            type="button"
            className="button"
            disabled={translate === 0}
            onClick={this.scrollLeft}
          >
            &lt;
          </button>
          <button
            type="button"
            className="button"
            disabled={translate === -this.maxscroll}
            onClick={this.scrollRight}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
  animationDuration: PropTypes.number,
};

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
};

export default Carousel;
