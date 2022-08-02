import { Component } from 'react';
import './Carousel.scss';
import { Frame } from '../types/Frame';

interface Props {
  images: Frame[];
}

interface State {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  scrollWidth: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

export class Carousel extends Component<Props, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    scrollWidth: 0,
    prevDisabled: true,
    nextDisabled: false,
  };

  moveSlide = (index: number) => {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemWidth,
    } = this.state;

    this.setState((prevState) => {
      const maxScroll = (images.length - frameSize) * itemWidth;
      let scroll = prevState.scrollWidth + (step * itemWidth * index);

      if (scroll >= maxScroll) {
        scroll = maxScroll;
      }

      if (scroll <= 0) {
        scroll = 0;
      }

      return {
        scrollWidth: scroll,
        nextDisabled: scroll === maxScroll,
        prevDisabled: scroll === 0,
      };
    });
  };

  nextSlide = () => {
    this.moveSlide(1);
  };

  prevSlide = () => {
    this.moveSlide(-1);
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
      scrollWidth,
      prevDisabled,
      nextDisabled,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <div className="Carousel__nav">
          <label>
            Step:
            <input
              type="number"
              min="1"
              max={frameSize}
              value={step}
              onChange={({ target }) => this.setState({ step: +target.value })}
            />
          </label>

          <label>
            Frame width:
            <input
              type="number"
              min="3"
              max={1300 / itemWidth}
              value={frameSize}
              onChange={({ target }) => (
                this.setState({ frameSize: +target.value })
              )}
            />
          </label>

          <label>
            Item width:
            <input
              type="number"
              min="130"
              max="300"
              value={itemWidth}
              step="10"
              onChange={({ target }) => (
                this.setState({ itemWidth: +target.value })
              )}
            />
          </label>

          <label>
            Animation duration:
            <input
              type="number"
              min="400"
              max="3000"
              value={animationDuration}
              step="100"
              onChange={({ target }) => (
                this.setState({ animationDuration: +target.value })
              )}
            />
          </label>
        </div>

        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-scrollWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map(({ id, image }) => (
            <li
              key={id}
              className="Carousel__item"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={image}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__btn-block">
          <button
            type="button"
            className="Carousel__button"
            disabled={prevDisabled}
            onClick={this.prevSlide}
          >
            Prev
          </button>
          <button
            type="button"
            className="Carousel__button"
            disabled={nextDisabled}
            onClick={this.nextSlide}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
