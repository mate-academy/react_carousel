import React from 'react';
import PropTypes from 'prop-types';
import CarouselImage from './CarouselImage';
import './Carousel.scss';
import Arrow from './Arrow';
import { ARROWS_TYPES } from '../App';

class Carousel extends React.Component {
  state = {
    position: 0,
  };

  changeImagesPositionLeft = () => {
    const { step, itemWidth, images, infinite } = this.props;

    this.setState((prevState) => {
      if (infinite) {
        return {
          position: prevState.position > 0
            ? Math.max(prevState.position - (step * itemWidth), 0)
            : ((images.length - step) * itemWidth),
        };
      }

      return {
        position: Math.max(prevState.position - (step * itemWidth), 0),
      };
    });
  };

  changeImagesPositionRight = () => {
    const { step, itemWidth, images, infinite } = this.props;

    this.setState((prevState) => {
      if (infinite) {
        return {
          position: prevState.position < ((images.length - step) * itemWidth)
            ? Math.min(
              prevState.position + (step * itemWidth),
              (images.length - step) * itemWidth
            )
            : 0,
        };
      }

      return {
        position: Math.min(
          prevState.position + (step * itemWidth),
          (images.length - step) * itemWidth
        ),
      };
    });
  };

  render() {
    const { images, itemWidth, frameSize, animationDuration } = this.props;
    const { position } = this.state;

    return (
      <div className="App__gallery">
        <Arrow
          direction={Object.keys(ARROWS_TYPES)[0]}
          clickFunction={this.changeImagesPositionLeft}
          glyphLink={ARROWS_TYPES.left}
        />

        <div
          className="carousel"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              right: `${position}px`,
              transition: `right ${animationDuration}ms`,
            }}
          >
            {images.map(
              image => (
                <CarouselImage
                  key={image}
                  image={image}
                  itemWidth={itemWidth}
                  animationDuration={animationDuration}
                />
              )
            )}
          </ul>
        </div>

        <Arrow
          direction={Object.keys(ARROWS_TYPES)[1]}
          clickFunction={this.changeImagesPositionRight}
          glyphLink={ARROWS_TYPES.right}
        />
      </div>
    );
  }
}

Carousel.propTypes = {
  step: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool,
};

Carousel.defaultProps = {
  infinite: false,
};

export default Carousel;
