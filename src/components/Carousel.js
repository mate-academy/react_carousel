import React from 'react';
import './Carousel.scss';
import PropType from 'prop-types';

class Carousel extends React.Component {
  state = {
    images: this.props.images,
    step: this.props.step,
    framesize: this.props.frameSize,
    itemwidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    currItem: 0,
  }

  nextFrame = () => {
    const step = this.state.currItem + this.state.framesize + this.state.step
      < this.state.images.length
      ? this.state.step
      : this.state.images.length - this.state.currItem - this.state.framesize;

    this.setState(prev => ({
      currItem: prev.currItem + step,
    }), () => {
      document
        // eslint-disable-next-line max-len
        .querySelector('.Carousel__list').style.cssText = `transform: translateX(${-this.state.currItem * this.state.itemwidth}px); transition: transform ${this.state.animationDuration}ms;`;
    });
  }

  prevFrame = () => {
    const step = this.state.currItem - this.state.step < 0
      ? this.state.currItem
      : this.state.step;

    this.setState(prev => ({
      currItem: prev.currItem - step,
    }), () => {
      document
        // eslint-disable-next-line max-len
        .querySelector('.Carousel__list').style.cssText = `transform: translateX(${-(this.state.currItem) * this.state.itemwidth}px); transition: transform ${this.state.animationDuration}ms;`;
    });
  }

  render() {
    const {
      images,
      framesize,
      itemwidth,
    } = this.state;

    const style = {
      width: itemwidth * framesize,
      height: itemwidth,
    };

    return (
      <div className="Carousel">
        <div
          className="Carousel__frame"
          style={style}
        >
          <ul className="Carousel__list">
            {images.map((img, i) => (
              <li
                key={img}
                className="Carousel__item"
              >
                <div
                  style={{
                    width: itemwidth,
                    height: itemwidth,
                  }}
                >
                  <img
                    src={img}
                    alt={i}
                    className="Carousel__img"
                    style={{
                      width: `100%`,
                      height: `auto`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" onClick={this.prevFrame}>Prev</button>
        <button type="button" onClick={this.nextFrame}>Next</button>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropType.instanceOf(Array).isRequired,
  step: PropType.number.isRequired,
  frameSize: PropType.number.isRequired,
  itemWidth: PropType.number.isRequired,
  animationDuration: PropType.number.isRequired,
};
