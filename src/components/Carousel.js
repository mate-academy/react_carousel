import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';
import List from './List';

class Carousel extends React.Component {
  state = {
    position: 0,
  }

  handleMove = (direction) => {
    const { step, itemWidth, infinite, images, frameSize } = this.props;
    const frameSizePx = itemWidth * frameSize;
    const maxPosition = -(Math.floor(images.length / frameSize)) * frameSizePx;

    if (direction === 'prev') {
      this.setState((state) => {
        if (state.position + (step * itemWidth) > 0) {
          return infinite ? { position: maxPosition } : { position: 0 };
        }

        return { position: state.position + (step * itemWidth) };
      });
    }

    if (direction === 'next') {
      this.setState((state) => {
        if (state.position - (step * itemWidth) < maxPosition) {
          return infinite ? { position: 0 } : { position: maxPosition };
        }

        return { position: state.position - (step * itemWidth) };
      });
    }
  }

  render() {
    const { images, frameSize, itemWidth, animationDuration } = this.props;
    const { position } = this.state;

    return (
      <div style={{ width: `${frameSize * itemWidth}px` }} className="carousel">
        <List
          position={position}
          images={images}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
        <button
          type="button"
          onClick={this.handleMove.bind(this, 'prev')}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.handleMove.bind(this, 'next')}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
