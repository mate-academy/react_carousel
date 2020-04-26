import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

import CarouselImg from '../CarouselList/CarouselImg';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.images = this.props.images;
    this.step = this.props.step;
    this.frameSize = this.props.frameSize;
    this.itemWidth = this.props.itemWidth;

    this.state = {
      currentImages: this.images.slice(0, this.frameSize),
    };
  }

  componentDidMount() {
    const { frameSize, itemWidth } = this.props;
    const carousel = document.querySelector('.Carousel__list');

    carousel.style.width = `${frameSize * itemWidth}px`;
  }

  nextImgs = () => {
    this.images = [
      ...this.images.slice(this.step),
      ...this.images.slice(0, this.step),
    ];

    this.setState({
      currentImages: this.images.slice(0, this.frameSize),
    });
  }

  prevImgs = () => {
    this.images = [
      ...this.images.slice(-this.step),
      ...this.images.slice(0, -this.step),
    ];

    this.setState({
      currentImages: this.images.slice(0, this.frameSize),
    });
  }

  render() {
    const { currentImages } = this.state;
    const { itemWidth } = this.props;

    return (
      <div className="Carousel">
        <button
          onClick={this.prevImgs}
          type="button"
        >
          ⇦
        </button>

        <ul className="Carousel__list">
          {currentImages.map((link) => {
            const idImg = /\d+/.exec(link);

            return (
              <li key={idImg}>
                <CarouselImg
                  link={link}
                  alt={idImg}
                  itemWidth={itemWidth}
                />
              </li>
            );
          })}
        </ul>

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
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
};

export default Carousel;
