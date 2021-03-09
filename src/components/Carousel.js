import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Carousel.scss';

class Carousel extends Component {
  static propTypes = {
    frame: PropTypes.number,
    itemWidth: PropTypes.number,
    step: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  }

  static defaultProps = {
    frame: 3,
    itemWidth: 130,
    step: 3,
  }

  state = {
    currentPosition: 0,
  }

  componentDidMount() {
    const list = document.querySelector('.Carousel__list');

    list.style.width = `${this.props.frame * this.props.itemWidth}px`;
    this.setState({
      scrollWidth: list.scrollWidth,

    });
  }

  componentDidUpdate() {
    const list = document.querySelector('.Carousel__list');

    list.scrollLeft = this.state.currentPosition;
  }

  scrollLeft = () => {
    const { scrollWidth, currentPosition } = this.state;
    const { step, itemWidth } = this.props;

    if ((currentPosition + (step * itemWidth))
      <= (scrollWidth - (step * itemWidth))) {
      this.setState(state => (
        { currentPosition: state.currentPosition + (step * itemWidth) }));
    } else {
      this.setState(state => (
        {
          currentPosition: state.currentPosition
            + (state.scrollWidth
              - (step * itemWidth) - state.currentPosition),
        }));
    }
  }

  scrollRight = () => {
    const { currentPosition } = this.state;
    const { step, itemWidth } = this.props;

    if ((currentPosition - (step * itemWidth)) >= 0) {
      this.setState(state => (
        { currentPosition: state.currentPosition - (step * itemWidth) }));
    } else {
      this.setState({ currentPosition: 0 });
    }
  }

  render() {
    const { images, itemWidth } = this.props;

    const preparedImages = images.map(image => ({
      id: image.replace(/[./img/.png]/g, ''),
      src: image,
    }));

    const imageList = preparedImages.map(image => (
      <li className="Carousel__item" key={image.id}>
        <img
          className="Carouser__image"
          src={image.src}
          alt={image.id}
          width={`${itemWidth}px`}
        />
      </li>

    ));

    return (
      <div className="Carousel">
        <ul className="Carousel__list">
          {imageList}
        </ul>

        <button
          className="Carousel__prev"
          type="button"
          onClick={this.scrollRight}
        >
          Prev
        </button>
        <button
          className="Carousel__next"
          type="button"
          onClick={this.scrollLeft}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
