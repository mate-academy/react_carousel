import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

export class Carousel extends React.Component {
  state = {
    images: this.props.images,
  }

  render() {
    const { images } = this.state;
    const settings = {
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
    };

    return (
      <div className="Carousel">
        <Slider {...settings}>
          {images.map((image, index) => (
            <img key={image} src={image} alt={index + 1} />
          ))}
        </Slider>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
