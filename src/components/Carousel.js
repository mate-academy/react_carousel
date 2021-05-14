import React from 'react';
import PropTypes, { string } from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    position: 0,
  };

  static propTypes = {
    images: PropTypes.arrayOf(string).isRequired,
    animationDuration: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
    frameSize: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  }

  btnNext() {
    const { itemWidth, step } = this.props;

    if (this.state.position - step * itemWidth < -7 * itemWidth) {
      this.setState({
        position: -(7 * itemWidth),
      });

      return 0;
    }

    this.setState(prev => ({ position: prev.position - step * itemWidth }));

    return 0; // linter expected to return value
  }

  btnPrev() {
    const { itemWidth, step } = this.props;

    if (this.state.position + step * itemWidth > 0) {
      this.setState({ position: 0 });

      return 0;
    }

    this.setState(prev => ({ position: prev.position + step * itemWidth }));

    return 0; // linter expected to return value
  }

  render() {
    const { images, animationDuration, itemWidth, frameSize } = this.props;

    const elemenStyle = {
      transform: `translateX(${this.state.position}px)`,
      transition: `transform ${animationDuration}ms`,
    };
    const carouselStyle = {
      width: `${frameSize * itemWidth}px`,
    };

    const imgStyle = {
      width: `${itemWidth}px`,
    };

    return (
      <div className="container" id="Carousel">
        <button
          type="button"
          className="prevBtn"
          onClick={() => this.btnPrev()}
        >
          Prev
        </button>

        <button
          type="button"
          className="nextBtn"
          onClick={() => this.btnNext()}
        >
          <span>next</span>
        </button>

        <div className="Carousel" style={carouselStyle}>
          {images.map(img => (
            <div className="element" style={elemenStyle}>
              <img src={img} className="Carousel-img" style={imgStyle} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
