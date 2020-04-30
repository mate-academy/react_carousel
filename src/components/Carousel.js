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
    const fullFramesAmount = Math.floor(images.length / frameSize) - 1;
    const picsShownAmount = ((fullFramesAmount + 1) * frameSize);
    const notFullFrameLength = ((images.length - picsShownAmount) * itemWidth);
    const maxPosition = -(fullFramesAmount * frameSizePx) - notFullFrameLength;

    if (direction === 'prev') {
      this.setState((state) => {
        if (state.position + (step * itemWidth) > 0) {
          if (infinite && state.position === 0) {
            return { position: maxPosition };
          }

          return { position: 0 };
        }

        return { position: state.position + (step * itemWidth) };
      });
    }

    if (direction === 'next') {
      this.setState((state) => {
        if (state.position - (step * itemWidth) < maxPosition) {
          if (infinite && state.position === maxPosition) {
            return { position: 0 };
          }

          return { position: maxPosition };
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
          onClick={() => this.handleMove('prev')}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => this.handleMove('next')}
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
