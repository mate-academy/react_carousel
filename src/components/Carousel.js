import React from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';
import './Carousel.css';

class Carousel extends React.Component {
  state = {
    width: this.props.itemWidth,
    step: this.props.step,
    marginLeft: 0,
  }

  slideLeft = () => {
    const { width, step, marginLeft } = this.state;
    const newPosition = Math.min(marginLeft + width * step, 0);

    this.setState({
      marginLeft: newPosition,
    });
  }

  slideRight = () => {
    const { width, step, marginLeft } = this.state;
    const slidesQuantity = this.props.images.length;
    const newPosition = Math.max(
      marginLeft - width * step,
      -width * (slidesQuantity - step),
    );

    this.setState({
      marginLeft: newPosition,
    });
  }

  render() {
    const { width, step, marginLeft } = this.state;
    const { images, frameSize, animationDuration } = this.props;
    const maxMargin = width * 6 + width * (images.length % step);

    return (
      <div className="Carousel" style={{ width: `${width * frameSize}px` }}>
        <ul
          className="Carousel__list"
          style={{
            marginLeft: `${marginLeft}px`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <Slide key={image} image={image} index={index} />
          ))}
        </ul>
        <button
          type="button"
          className="button button-prev"
          onClick={this.slideLeft}
          disabled={!marginLeft}
        />
        <button
          type="button"
          className="button button-next"
          onClick={this.slideRight}
          disabled={marginLeft === -maxMargin}
        />
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired),
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

Carousel.defaultProps = {
  images: [],
};

export default Carousel;
