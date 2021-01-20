import PropTypes, { string } from 'prop-types';
import React from 'react';
import './Carousel.scss';

export class Carousel extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(string).isRequired,
    itemWidth: PropTypes.number.isRequired,
    frameSize: PropTypes.number.isRequired,
    infinite: PropTypes.bool.isRequired,
    animationDuration: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  }

  state = {
    position: 0,
    images: [...this.props.images],
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
  }

  getNumber = stringAttr => stringAttr.replace('/img/', '').split('.')[1]

  shiftPrev = () => {
    const { position, itemWidth, frameSize, infinite } = this.state;

    this.setState(prevState => (position === 0 && infinite
      ? { position: -(itemWidth * 7) }
      : { position: Math.min(prevState.position + itemWidth * frameSize, 0) }));
  }

  shiftNext = () => {
    const { images,
      position,
      itemWidth,
      frameSize,
      infinite,
      step } = this.state;
    // eslint-disable-next-line
    this.setState(prevState => (position <= -(itemWidth * 7) && infinite
      ? { position: 0 }
    // eslint-disable-next-line
      : { position: Math.max(prevState.position - itemWidth * step, -itemWidth * (images.length - frameSize)) }));
  }

  render() {
    const { position,
      images,
      frameSize,
      itemWidth,
      animationDuration } = this.state;

    const listStyle = {
      marginLeft: `${position}px`,
      animationDuration: `${animationDuration}ms`,
    };

    return (
      <div
        className="Carousel"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul className="Carousel__list" style={listStyle}>
          {images.map(image => (
            <li
              className="Carousel__list-tiem"
              key={this.getNumber(image)}
            >
              <img
                className="Carousel__img"
                width={`${itemWidth}px`}
                src={image}
                alt={this.getNumber(image)}
              />
            </li>
          ))}
        </ul>
        <div
          className="Carousel__buttons"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <button
            type="button"
            className="Carousel__button Carousel__button--prev"
            onClick={this.shiftPrev}
          />
          <button
            type="button"
            className="Carousel__button Carousel__button--next"
            onClick={this.shiftNext}
          />
        </div>
      </div>
    );
  }
}
