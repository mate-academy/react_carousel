import React from 'react';
import propTypes from 'prop-types';

import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    position: 0,
  }

  nextClickHandler = () => {
    const { itemWidth, images, step } = this.props;
    const maxWidth = itemWidth * images.length;
    const picturesSectionWidth = step * itemWidth;

    this.setState((prevState) => {
      if (maxWidth - picturesSectionWidth < prevState.position) {
        return false;
      }

      return {
        position: prevState.position + (step * itemWidth),
      };
    });
  }

  prevClickHandler = () => {
    this.setState((prevState) => {
      const { step, itemWidth } = this.props;

      if (prevState.position <= 0) {
        return false;
      }

      return {
        position: prevState.position - (step * itemWidth),
      };
    });
  }

  render() {
    const { images, itemWidth, frameSize } = this.props;
    const { position } = this.state;

    return (
      <div
        className="carousel"
        style={{
          maxWidth: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="carousel__list"
          style={{
            width: `${itemWidth * images.length}px`,
            marginLeft: `${-position}px`,
          }}
        >
          {images.map((image, i) => (
            <li key={image} className="carousel__item">
              <img
                src={image}
                width={`${itemWidth}px`}
                alt={i + 1}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.prevClickHandler}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.nextClickHandler}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: propTypes.arrayOf(
    propTypes.string.isRequired,
  ).isRequired,

  step: propTypes.number.isRequired,
  frameSize: propTypes.number.isRequired,
  itemWidth: propTypes.number.isRequired,
};
