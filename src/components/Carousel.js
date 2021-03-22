import React from 'react';
import PropTypes from 'prop-types';
import { ImagesList } from './ImagesList/ImagesList';
import { ImagesType } from '../types';

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
    const { images, itemWidth, frameSize, animationDuration } = this.props;
    const { position } = this.state;

    return (
      <div
        className="carousel"
        style={{
          maxWidth: `${itemWidth * frameSize}px`,
        }}
      >
        <ImagesList
          animationTime={animationDuration}
          images={images}
          itemWidth={itemWidth}
          position={position}
        />
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
  images: ImagesType.isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
