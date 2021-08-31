import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  carousel = document.querySelector('ul');

  state = {
    counter: 0,
  }

  scrollCaroselLeft = (step, itemWidth) => {
    document.querySelector('.Carousel').scrollLeft -= step * itemWidth;
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  scrollCaroselRight = (step, itemWidth) => {
    document.querySelector('.Carousel').scrollLeft += step * itemWidth;
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  render() {
    const { step, itemWidth, frameSize, images } = this.props;
    const totalStepNumber = Math.floor(images.length / step);

    return (
      <div className="Container">
        <button
          type="button"
          onClick={() => this.scrollCaroselLeft(step, itemWidth)}
          disabled={this.state.counter <= 0}
        >
          ⇦
        </button>
        <div
          className="Carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul className="Carousel__list">
            {images.map((url, index) => (
              <li>
                <img
                  src={url}
                  alt={index}
                  key={url}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => this.scrollCaroselRight(step, itemWidth)}
          disabled={this.state.counter >= totalStepNumber}
        >
          ⇨
        </button>
        {this.state.counter}
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  step: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
};
