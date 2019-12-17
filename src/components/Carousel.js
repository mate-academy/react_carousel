import React from 'react';
import propTypes from 'prop-types';

class Carousel extends React.Component {
  state = { position: 0 }

  pressPrev = () => {
    const { itemWidth, step } = this.props;

    this.setState((state) => {
      let positionCount = state.position;

      positionCount += itemWidth * step;
      positionCount = Math.min(positionCount, 0);

      return { position: positionCount };
    });
  }

  pressNext = () => {
    const { images, itemWidth, step } = this.props;

    this.setState((state) => {
      let positionCount = state.position;

      positionCount -= itemWidth * step;
      positionCount = Math.max(
        positionCount, -itemWidth * (images.length - step)
      );

      return { position: positionCount };
    });
  }

  render() {
    const { images, animationDuration } = this.props;
    const { position } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            marginLeft: `${position}px`,
            transition: `margin ${animationDuration}s`,
          }}
        >
          {
            images.map((el, i) => (
              <li key={el} className="images">
                <img
                  src={`./img/${i + 1}.png`}
                  alt={i + 1}
                />
              </li>
            ))
          }
        </ul>
        <button
          type="button"
          className="button button--prev"
          onClick={this.pressPrev}
        >
          {'<'}
        </button>
        <button
          type="button"
          className="button button--next"
          onClick={this.pressNext}
        >
          {'>'}
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: propTypes.arrayOf(propTypes.string).isRequired,
  itemWidth: propTypes.number.isRequired,
  step: propTypes.number.isRequired,
  animationDuration: propTypes.number.isRequired,
};

export default Carousel;
