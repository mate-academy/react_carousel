import React from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
  }

  handleNextClick = () => {
    if (this.state.position >= 1050) {
      return;
    }

    if (this.state.position === 900) {
      this.setState(state => ({ position: state.position + 150 }));
    } else {
      this.setState(state => ({ position: state.position + 450 }));
    }
  }

  handlePrevClick = () => {
    if (this.state.position === 0) {
      return;
    }

    if (this.state.position === 150) {
      this.setState(state => ({ position: state.position - 150 }));
    } else {
      this.setState(state => ({ position: state.position - 450 }));
    }
  }

  render() {
    const { images } = this.props;
    const listPositon = {
      transform: `translate(0, -${this.state.position}px)`,
    };

    return (
      <div className="Carousel">
        <div className="wrapper">
          <button
            className={this.state.position === 0
              ? 'btn btn_prev disabled'
              : 'btn btn_prev'}
            onClick={this.handlePrevClick}
            type="button"
          >
            {this.state.position === 0 ? 'X' : '<'}
          </button>
          <ul
            style={listPositon}
            className="Carousel__list"
          >
            {images.map((image, index) => (
              <li className="Carusel__item"><img src={image} alt={index} /></li>
            ))}
          </ul>

          <button
            className={this.state.position >= 1050
              ? 'btn btn_next disabled'
              : 'btn btn_next'}
            onClick={this.handleNextClick}
            type="button"
          >
            {this.state.position >= 1050 ? 'X' : '>'}
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.string.isRequired,
};

export default Carousel;
