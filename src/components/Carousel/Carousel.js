import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

class Carousel extends React.Component {
  count = 0;

  componentDidMount() {
    const { frameSize, itemWidth, animationDuration } = this.props;
    const carouselWrap = document.querySelector('.Carousel__wrap');
    const carouselList = document.querySelector('.Carousel__list');

    carouselWrap.style.width = `${frameSize * itemWidth}px`;
    carouselList.style.transitionDuration = `${animationDuration / 1000}s`;
  }

  prevImgs = () => {
    const { step, itemWidth, frameSize, images, infinite } = this.props;
    const ul = document.querySelector('.Carousel__list');

    if (infinite && this.count === 0) {
      this.count = images.length - frameSize;
    } else {
      this.count -= step;
    }

    if (this.count < 0) {
      this.count = 0;
    }

    ul.style.marginLeft = `-${itemWidth * this.count}px`;
  }

  nextImgs = () => {
    const { step, itemWidth, frameSize, images, infinite } = this.props;
    const ul = document.querySelector('.Carousel__list');

    if (infinite && this.count === images.length - frameSize) {
      this.count = 0;
    } else {
      this.count += step;
    }

    if (this.count > images.length - frameSize) {
      this.count = images.length - frameSize;
    }

    ul.style.marginLeft = `-${itemWidth * this.count}px`;
  }

  render() {
    const { images, itemWidth } = this.props;

    return (
      <div className="Carousel">
        <button
          onClick={this.prevImgs}
          type="button"
        >
          ⇦
        </button>

        <div className="Carousel__wrap">
          <ul className="Carousel__list">

            {images.map((link) => {
              const idImg = /\d+/.exec(link);

              return (
                <li key={idImg}>
                  <img
                    style={{ width: `${itemWidth}px` }}
                    src={link}
                    alt={idImg}
                  />
                </li>
              );
            })}

          </ul>
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
