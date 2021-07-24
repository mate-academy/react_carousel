import React from 'react';

import { Slider, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    images: this.props.images,
    itemWidth: this.props.itemWidth,
    step: this.props.step,
    frameSize: this.props.frameSize,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    positionX: 0,
  }

  showNextSlide = () => {
    this.setState((prev) => {
      const maxCarouselLength
        = prev.itemWidth * (prev.images.length - prev.frameSize);

      return (
        prev.positionX + (prev.itemWidth * prev.step) >= maxCarouselLength
      )
        ? ({ positionX: maxCarouselLength })
        : ({ positionX: prev.positionX + (prev.itemWidth * prev.step) });
    });
  }

  showPreviouslySlide = () => {
    this.setState((prev) => {
      if (prev.positionX - (prev.itemWidth * prev.step) <= 0) {
        return { positionX: 0 };
      }

      return {
        positionX: prev.positionX - (prev.itemWidth * prev.step),
      };
    });
  }

  getItemWidth = (e, value) => {
    this.setState({
      itemWidth: value,
    });
  }

  getFrameSize = (e, value) => {
    this.setState({
      frameSize: value,
    });
  }

  getStepSize = (e, value) => {
    this.setState({
      step: value,
    });
  }

  getAnimationDuration = (e, value) => {
    this.setState({
      animationDuration: value * 1000,
    });
  }

  makeFillModeOn = () => {
    document.addEventListener('keydown', this.stopFillMode, false);
    this.setState(prev => ({
      infinite: true,
      step: 1,
      frameSize: 1,
      itemWidth: 300,
      positionX: 0,
      images: [...prev.images],
    }));
    this.autoSlider();
  }

  stopFillMode = (event) => {
    if (event.keyCode === 27) {
      this.setState({
        infinite: false,
        step: 3,
        frameSize: 3,
        itemWidth: 130,
        positionX: 0,
        images: this.props.images,
      });
      document.removeEventListener('keydown', this.stopFillMode, false);
      clearInterval(this.state.sliderId);
    }
  }

  autoSlider = () => {
    const { images, itemWidth, animationDuration, positionX } = this.state;

    this.state.sliderId = setInterval(() => {
      this.setState(prev => ({
        positionX: prev.positionX + prev.itemWidth,
      }));

      if (positionX === itemWidth * (images.length)) {
        this.setState(prev => ({
          images: [...prev.images].concat(prev.images),
        }));
      }
    }, animationDuration);
  }

  render() {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    const carouselStyle = {
      minWidth: `${images.length * itemWidth}px`,
      transition: `transform ${animationDuration}ms`,
      transform: `translateX(-${this.state.positionX}px)`,
    };

    const fillMode = {
      wrapper: {
        boxShadow: '0 20px 50px rgba(19, 17, 17, 0.8)',
        padding: '0 70px',
        height: '70vh',
        transition: `max-width 0.5s ease,
          height 0.5s ease,
          background-color 0.5s ease`,
      },
      carousel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'min-content',
        transition: 'height 0.5s ease',
      },
      control: {
        display: 'none',
      },
      button: {
        display: 'none',
      },
    };

    return (
      <div className="wrapper" style={infinite ? fillMode.wrapper : null}>
        <div className="carousel" style={infinite ? fillMode.carousel : null}>
          <button
            className="carousel__btn"
            type="button"
            onClick={() => {
              this.showPreviouslySlide();
            }}
            style={infinite ? fillMode.button : null}
          >
            <img
              className="carousel__btn-prev"
              src="./img/arrow-icon.png"
              alt="previously"
            />
          </button>
          {
            infinite
              ? <p className="carousel__slide-show-text">Slide show</p>
              : null
          }
          <div
            className="carousel__wrapper"
            style={{ maxWidth: `${frameSize * itemWidth}px` }}
          >
            <ul className="carousel__list" style={{ ...carouselStyle }}>
              {images.map(image => (
                <li key={Math.random()} className="carousel__item">
                  <img
                    src={image}
                    alt="smile"
                    style={{ width: `${itemWidth}px` }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            className="carousel__btn"
            type="button"
            onClick={() => {
              this.showNextSlide();
            }}
            style={infinite ? fillMode.button : null}
          >
            <img
              className="carousel__btn-next"
              src="./img/arrow-icon.png"
              alt="previously"
            />
          </button>
        </div>
        <div
          className="carousel-control"
          style={infinite ? fillMode.control : null}
        >
          <div className="carousel-control__item-width">
            <p className="carousel-control__label">Images width</p>
            <Slider
              className="carousel-control__slider"
              color="primary"
              defaultValue={itemWidth}
              min={80}
              max={200}
              step={1}
              key={`slider-${itemWidth}`}
              onChange={this.getItemWidth}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="carousel-control__frame-size">
            <p className="carousel-control__label">Show images</p>
            <Slider
              className="carousel-control__slider"
              color="primary"
              defaultValue={frameSize}
              min={1}
              max={5}
              step={1}
              key={`slider-${frameSize}`}
              onChange={this.getFrameSize}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="carousel-control__step">
            <p className="carousel-control__label">Step of scrolling</p>
            <Slider
              className="carousel-control__slider"
              color="primary"
              defaultValue={step}
              min={1}
              max={3}
              step={1}
              key={`slider-${step}`}
              onChange={this.getStepSize}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="carousel-control__animation">
            <p className="carousel-control__label">Animation duration</p>
            <Slider
              className="carousel-control__slider"
              color="primary"
              defaultValue={animationDuration / 1000}
              min={1}
              max={5}
              step={1}
              key={`slider-${animationDuration}`}
              onChange={this.getAnimationDuration}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <div className="carousel-film-mode">
          {
            !infinite
              ? (
                <Button
                  style={{
                    fontFamily: 'inherit', textTransform: 'capitalize',
                  }}
                  className="carousel-film-mode__btn"
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.makeFillModeOn();
                  }}
                >
                  Slide Show
                </Button>
              )
              : (
                <p className="carousel-film-mode__text">
                  Press esc to exit slideshow mode
                </p>
              )
          }
        </div>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  itemWidth: PropTypes.number,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
};

Carousel.defaultProps = {
  images: [],
  itemWidth: 130,
  step: 1,
  frameSize: 3,
  animationDuration: 1000,
  infinite: false,
};
