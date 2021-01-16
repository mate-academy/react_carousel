import PropTypes, { string } from 'prop-types';
import React from 'react';
import './Carousel.scss';

export class Carousel extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(string).isRequired,
  }

  state = {
    frameSize: 3,
    position: 0,
    itemWidth: 130,
  }

  getNumber = stringAttr => stringAttr.replace('/img/', '').split('.')[1]

  shiftPrev = () => {
    const ul = document.querySelector('.Carousel__list');
    // eslint-disable-next-line
    this.setState(prevState => (this.state.position === 0
      // eslint-disable-next-line
      ? { position: -(this.state.itemWidth * 7) }
      // eslint-disable-next-line
      : { position: Math.min(prevState.position + this.state.itemWidth * this.state.frameSize, 0) }));

    ul.style.marginLeft = `${this.state.position}px`;
  }

  shiftNext = () => {
    const ul = document.querySelector('.Carousel__list');

    // eslint-disable-next-line
    this.setState(prevState => (this.state.position <= -(this.state.itemWidth * 7)
      ? { position: 0 }
      // eslint-disable-next-line
      : { position: Math.max(prevState.position - this.state.itemWidth * this.state.frameSize, -this.state.itemWidth * (this.props.images.length - this.state.frameSize)) }));

    ul.style.marginLeft = `${this.state.position}px`;
  }

  render() {
    const { images } = this.props;

    return (
      <div className="Carousel">
        <ul className="Carousel__list">
          {images.map(image => (
            <li
              className="Carousel__list-tiem"
              key={this.getNumber(image)}
            >
              <img
                className="Carousel__img"
                src={image}
                alt={this.getNumber(image)}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__buttons">
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
