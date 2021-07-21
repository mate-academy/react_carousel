import React from 'react';
import { FormCarousel } from './FormCarousel';
import { carouselPropTypees } from './proptypes';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    animationDuration: this.props.animationDuration,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    infinite: this.props.infinite,
    maxWidth: this.props.itemWidth * this.props.images.length,
    scroll: 0,
  }

  clickPrev = () => {
    this.setState((prevState) => {
      const maxScroll
        = prevState.maxWidth - (prevState.itemWidth * prevState.frameSize);

      if (prevState.infinite && prevState.scroll === 0) {
        return { scroll: maxScroll };
      }

      if (prevState.scroll - prevState.itemWidth * prevState.step <= 0) {
        return { scroll: 0 };
      }

      return { scroll: prevState.scroll
        - prevState.itemWidth * prevState.step };
    });
  };

  clickNext = () => {
    this.setState((prevState) => {
      const maxScroll
        = prevState.maxWidth - (prevState.itemWidth * prevState.frameSize);

      if (prevState.infinite && prevState.scroll === maxScroll) {
        return { scroll: 0 };
      }

      if (prevState.scroll + prevState.itemWidth
        * prevState.step >= maxScroll) {
        return { scroll: maxScroll };
      }

      return { scroll: prevState.scroll
        + prevState.itemWidth * prevState.step };
    });
  };

  changeState = (event, atribute) => {
    this.setState({
      [atribute]: event.target.value,
      scroll: 0,
    });
  };

  changeStateItemWidth = (event) => {
    this.setState({
      itemWidth: event.target.value,
      scroll: 0,
      maxWidth: event.target.value * this.props.images.length,
    });
  };

  changeStateInfinite = () => {
    this.setState(prevState => ({ infinite: !prevState.infinite }));
  };

  render() {
    const { images } = this.props;

    const listStyle = {
      width: `${this.state.frameSize * this.state.itemWidth}px`,
    };

    const itemStyle = {
      transition: `transform ${this.state.animationDuration / 1000}s`,
      transform: `translateX(-${this.state.scroll}px)`,
    };

    const imageStyle = {
      width: `${this.state.itemWidth}px`,
    };

    return (
      <>
        <div className="Carousel">
          <button
            type="button"
            className="button"
            onClick={this.clickPrev}
          >
            {'<'}
          </button>

          <ul className="Carousel__list" style={listStyle}>
            {images.map(image => (
              <li key={image} className="Carousel__item" style={itemStyle}>
                <img
                  src={image}
                  alt={image}
                  className="Carousel__image"
                  style={imageStyle}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="button"
            onClick={this.clickNext}
          >
            {'>'}
          </button>
        </div>

        <FormCarousel
          state={this.state}
          changeState={this.changeState}
          changeStateItemWidth={this.changeStateItemWidth}
          changeStateInfinite={this.changeStateInfinite}
        />
      </>
    );
  }
}

Carousel.propTypes = carouselPropTypees;

Carousel.defaultProps = {
  itemWidth: 130,
  step: 3,
  frameSize: 3,
  animationDuration: 1000,
  infinite: false,
};

export default Carousel;
