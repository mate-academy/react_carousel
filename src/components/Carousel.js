import React, { Component } from 'react';

import './Carousel.scss';
import CarouselSettings from './CarouselSettings';

class Carousel extends Component {
  state = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    pos: 0,
    img: 130,
    step: 3,
    animation: 1000,
    frame: 3,
  };

  toRight = () => {
    const { step, img, pos, frame } = this.state;
    let position = pos;
    const minPos = (frame * img) - (img * 10);

    position -= img * step;

    if (position < minPos) {
      position = minPos;
    }

    this.setState({ pos: position });
  };

  toLeft = () => {
    const { pos, step, img } = this.state;
    let position = pos;

    position += img * step;

    if (position > 0) {
      position = 0;
    }

    this.setState({ pos: position });
  };

  changeStep = (value) => {
    this.setState({ step: value });
  };

  changeFrame = (value) => {
    const position = 0;

    this.setState({
      frame: value,
      pos: position,
    });
  };

  changeImage = (value) => {
    const position = 0;

    this.setState({
      img: value,
      pos: position,
    });
  };

  changeAnimation = (value) => {
    this.setState({ animation: value });
  };

  render() {
    const { images, pos, img, animation, frame } = this.state;
    const galeryWidth = frame * img;

    return (
      <>
        <div className="gallery">
          <div
            className="Carousel"
            style={{ width: `${galeryWidth}px` }}
          >
            <ul
              className="Carousel__list"
              style={{
                transition: `transform ${animation}ms`,
                transform: `translateX(${pos}px`,
              }}
            >
              {images.map(image => (
                <li
                  key={image}
                  className="Carousel__item"
                >
                  <img
                    src={image}
                    alt={image}
                    className="Carousel__img"
                    style={{
                      width: `${img}px`,
                      height: `${img}px`,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            className="Carousel__button Carousel__button--prev"
            type="button"
            onClick={this.toLeft}
          >
            Prev
          </button>
          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            onClick={this.toRight}
          >
            Next
          </button>

          <CarouselSettings
            changeStep={this.changeStep}
            changeFrame={this.changeFrame}
            changeImage={this.changeImage}
            changeAnimation={this.changeAnimation}
          />
        </div>
      </>
    );
  }
}

export default Carousel;
