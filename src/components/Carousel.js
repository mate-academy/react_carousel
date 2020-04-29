import React from 'react';
import PropsTypes from 'prop-types';
import './Carousel.css';

class Carousel extends React.Component {
  state = {
    index: 0,
    visibleItem: 4,
    widthItem: 130,
  }

  prevClick = () => {
    this.setState(state => ({
      index: state.index === 0
        ? this.props.images.length - state.visibleItem : state.index - 1,
    }));
  }

  nextClick = () => {
    this.setState(state => ({
      index: state.index + state.visibleItem === this.props.images.length
        ? 0 : state.index + 1,
    }));
  }

  render() {
    const { images } = this.props;
    const { index, visibleItem, widthItem } = this.state;

    return (
      <div
        style={{ width: `${widthItem * visibleItem}px` }}
        className="Carousel"
      >
        <ul
          style={{ transform: `translateX(-${index * widthItem}px)` }}
          className="Carousel__list"
        >
          {images.map(el => (
            <li key={el}><img src={el} alt="index" /></li>
          ))
          }
        </ul>

        <button onClick={this.prevClick} type="button">Prev</button>
        <button onClick={this.nextClick} type="button">Next</button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropsTypes.arrayOf.isRequired,
};

export default Carousel;
