import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

type State = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  position: number
};

class Carousel extends React.Component<Props, State> {
  state = {
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    position: 0,
  };

  styleList2 = {
    width: `${1300}px`,
  };

  nextSlide = () => {
    const {
      position, itemWidth, frameSize,
    } = this.state;
    const maxPosition = (this.props.images.length * itemWidth) - (itemWidth * frameSize);

    this.setState(() => (position > maxPosition - (itemWidth * frameSize)
      ? { position: maxPosition - (itemWidth * frameSize) }
      : null));

    this.setState(() => (position > maxPosition - (itemWidth * frameSize)
      ? { position: maxPosition - (itemWidth * frameSize) }
      : null));

    this.setState((state) => ({ position: state.position + (itemWidth * frameSize) }));
  };

  prevSlide = () => {
    const {
      position,
      itemWidth,
      frameSize,
    } = this.state;

    const minPosition = 0;

    this.setState(() => ((position < minPosition + (itemWidth * frameSize))
      ? { position: minPosition + (itemWidth * frameSize) }
      : null));
    this.setState((state) => ((position > minPosition + (itemWidth * frameSize))
      ? { position: state.position - (itemWidth * frameSize) }
      : { position: minPosition }));
  };

  randomIndex = () => Math.floor(Math.random() * 1000000);

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      step,
      position,
      animationDuration,
    } = this.state;

    const corouselStyle = {
      width: itemWidth * frameSize,
    };

    const listStyle = {
      width: itemWidth * this.props.images.length,
      transform: `translateX(${-position}px)`,
      transition: `transform ${animationDuration}ms`,
    };

    const listImageStyle = {
      width: itemWidth,
    };

    return (
      <div className="Carousel">
        <div
          className="Carousel__render"
          style={corouselStyle}
        >
          <ul
            className="Carousel__list"
            style={listStyle}
          >
            {images.map((img, index) => (
              <li
                key={this.randomIndex()}
                className="Carousel__list__item"
              >
                <img
                  className="Carousel__list__img"
                  src={img}
                  alt={`${index}`}
                  style={listImageStyle}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__control">
          <div className="Carousel__buttons">
            <button
              className="Carousel__button Carousel__button--prev"
              type="button"
              onClick={this.prevSlide}
            >
              <img src="./img/right-arrow.png" alt="" />
            </button>
            <button
              className="Carousel__button Carousel__button--next"
              type="button"
              onClick={this.nextSlide}
            >
              <img src="./img/right-arrow.png" alt="" />
            </button>
          </div>

          <form className="Carousel__control__form">
            <label htmlFor="Zoom__image" className="Carousel__control__item">
              Images size:
              {' '}
              <input
                id="Zoom__image"
                className="Zoom__image"
                type="range"
                value={itemWidth}
                min={50}
                max={260}
                step={10}
                onChange={(e) => {
                  this.setState({ itemWidth: +e.target.value });
                }}
              />
            </label>
            <label htmlFor="Image__count" className="Carousel__control__item">
              Frame size:
              {' '}
              <input
                id="Image__count"
                type="range"
                min={1}
                max={5}
                value={frameSize}
                onChange={(e) => {
                  this.setState({ frameSize: +e.target.value });
                }}
              />
            </label>

            <label htmlFor="Image__step" className="Carousel__control__item">
              Step:
              {' '}
              <input
                id="Image__step"
                type="range"
                min={1}
                max={5}
                value={step}
                onChange={(e) => {
                  this.setState({ step: +e.target.value });
                }}
              />
            </label>

            <label htmlFor="Image__step" className="Carousel__control__item">
              Animation speed:
              {' '}
              <input
                id="Image__step"
                type="range"
                min={500}
                max={3000}
                value={animationDuration}
                onChange={(e) => {
                  this.setState({ animationDuration: +e.target.value });
                }}
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Carousel;
