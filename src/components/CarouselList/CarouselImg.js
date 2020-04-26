import React from 'react';
import PropTypes from 'prop-types';

class CarouselImg extends React.PureComponent {
  componentDidMount() {
    const { itemWidth } = this.props;
    const imges = document.querySelectorAll('.Carousel__img');

    imges.forEach((el) => {
      const img = el;

      img.style.width = `${itemWidth}px`;
    });
  }

  render() {
    const { link, alt } = this.props;

    return (
      <img
        className="Carousel__img"
        src={link}
        alt={alt}
      />
    );
  }
}

CarouselImg.propTypes = {
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default CarouselImg;
