import React, { Component } from 'react';

import './Carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  toRight = () => {
    const list = document.querySelector('.Carousel__list');
    const { step, img, pos, frame } = this.state;
    let position = pos;
    const minPos = (frame * img) - (img * 10);

    position -= img * step;

    if (position < minPos) {
      position = minPos;
    }

    list.style.transform = `translateX(${position}px)`;

    this.setState({ pos: position });
  };

  toLeft = () => {
    const { pos, step, img } = this.state;
    const list = document.querySelector('.Carousel__list');
    let position = pos;

    position += img * step;

    if (position > 0) {
      position = 0;
    }

    list.style.transform = `translateX(${position}px)`;
    this.setState({ pos: position });
  };

  changeStep = (event) => {
    this.setState({ step: event.target.value });
  };

  changeImage = (event) => {
    const position = 0;

    this.setState({
      img: event.target.value,
      pos: position,
    });
    document.querySelector('.Carousel__list')
      .style.transform = `translateX(${position}px)`;
  };

  changeAnimation = (event) => {
    this.setState({ animation: event.target.value });
  };

  changeFrame = (event) => {
    const position = 0;

    this.setState({
      frame: event.target.value,
      pos: position,
    });
    document.querySelector('.Carousel__list')
      .style.transform = `translateX(${position}px)`;
  };

  render() {
    const galeryWidth = this.state.frame * this.state.img;

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
                transition: `transform ${this.state.animation}ms`,
              }}
            >
              {this.state.images.map(image => (
                <li
                  key={Math.random()}
                  className="Carousel__item"
                >
                  <img
                    src={image}
                    alt={image}
                    className="Carousel__img"
                    style={{
                      width: `${this.state.img}px`,
                      height: `${this.state.img}px`,
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
        </div>

        <div>
          <form
            className="form"
          >
            <label
              className="form__lable"
            >
              Step:
              <input
                name="step"
                className="form__input"
                type="number"
                value={this.state.step}
                min="1"
                max="10"
                onChange={this.changeStep}
              />
            </label>

            <lable className="form__lable">
              Frame size:
              <input
                name="frame"
                className="form__input"
                type="number"
                value={this.state.frame}
                max="8"
                min="1"
                onChange={this.changeFrame}
              />
            </lable>

            <lable className="form__lable">
              Image size:
              <input
                name="img"
                className="form__input"
                type="number"
                value={this.state.img}
                step="5"
                min="50"
                max="150"
                onChange={this.changeImage}
              />
            </lable>

            <lable className="form__lable">
              Animation duration:
              <input
                name="animation"
                className="form__input"
                type="number"
                value={this.state.animation}
                step="100"
                min="0"
                onChange={this.changeAnimation}
              />
            </lable>
          </form>
        </div>
      </>
    );
  }
}

export default Carousel;
