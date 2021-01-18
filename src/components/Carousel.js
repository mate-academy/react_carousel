import React from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';

class Carousel extends React.Component {
  state = {
    imagesWidth: 1300,
    images: [...this.props.images],
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    counter: this.props.frameSize,
    translateX: 0,
  }

  getImageId = element => element.match(/\d/g).join('');

  nextSlide = () => {
    const { images, counter, itemWidth, step } = this.state;

    if (images.length === counter) {
      this.setState(prevState => ({
        translateX: 0,
        counter: prevState.frameSize,
      }));
    } else if (images.length - counter < step) {
      this.setState(prevState => ({
        translateX: prevState.translateX
        - (images.length - counter) * itemWidth,
        counter: prevState.counter + (images.length - counter),
      }));
    } else {
      this.setState(prevState => ({
        translateX: prevState.translateX - prevState.itemWidth * prevState.step,
        counter: prevState.counter + prevState.step,
      }));
    }
  }

  prevSlide = () => {
    const { counter, itemWidth, step, frameSize } = this.state;

    if (counter === frameSize) {
      this.setState(prevState => ({
        translateX: -prevState.imagesWidth + (counter * itemWidth),
        counter: prevState.images.length,
      }));
    } else if (this.state.counter - frameSize < frameSize) {
      this.setState(prevState => ({
        translateX: prevState.translateX + (counter - frameSize) * itemWidth,
        counter: prevState.frameSize,
      }));
    } else {
      this.setState(prevState => ({
        translateX: prevState.translateX + itemWidth * step,
        counter: prevState.counter - prevState.step,
      }));
    }
  }

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      translateX,
    } = this.state;

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${frameSize * itemWidth}px`,
            }}
          >
            {images.map(image => (
              <li
                key={this.getImageId(image)}
                style={{
                  transition: `transform ${animationDuration}ms ease`,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                <img src={image} alt="1" />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={this.prevSlide}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={this.nextSlide}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
