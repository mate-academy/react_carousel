import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import CarouselList from './CarouselList';
import CarouselButton from './CarouselButton';

class Carousel extends React.PureComponent {
  state = {
    images: [...this.props.images],
  };

  handleScroll = (e) => {
    const { step, itemWidth } = this.props;
    const scrollWidth = step * itemWidth;
    const { id } = e.target;
    const container = document.querySelector('.carousel__container');

    if (id === 'carousel-btn-next') {
      container.scrollLeft += scrollWidth;
    }

    if (id === 'carousel-btn-prev') {
      container.scrollLeft -= scrollWidth;
    }
  }

  render() {
    const { images } = this.state;
    const { frameSize, itemWidth } = this.props;

    return (
      <div className="carousel">
        <CarouselList
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
        />
        <CarouselButton id="prev" handler={this.handleScroll} />
        <CarouselButton id="next" handler={this.handleScroll} />
      </div>
    );
  }
}

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
};

export default Carousel;
