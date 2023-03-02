/* eslint-disable object-curly-newline */
import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  isFiniteCarousel: boolean,
};

type State = {
  isFinite: boolean
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  coordX: number,
};

class Carousel extends Component<Props, State> {
  state: State = {
    isFinite: this.props.isFiniteCarousel,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    coordX: 0,
  };

  swipe = (direction: 'prev' | 'next') => {
    const { images } = this.props;
    const { coordX, itemWidth, frameSize, step, isFinite } = this.state;
    const frameWidth = images.length * itemWidth;
    const limit = frameWidth - frameSize * itemWidth;
    const oneStepWidth = step * itemWidth;

    switch (direction) {
      case 'next':
        if (coordX === limit && isFinite) {
          this.setState({ coordX: 0 });
        } else if (coordX + oneStepWidth >= limit) {
          this.setState({ coordX: limit });
        } else {
          this.setState(state => ({
            coordX: state.coordX + state.step * state.itemWidth,
          }));
        }

        break;

      case 'prev':
        if (coordX === 0 && isFinite) {
          this.setState({ coordX: limit });
        } else if (coordX < oneStepWidth) {
          this.setState({ coordX: 0 });
        } else {
          this.setState(state => ({
            coordX: state.coordX - state.step * state.itemWidth,
          }));
        }

        break;

      default:
        break;
    }
  };

  render() {
    const { frameSize, itemWidth, coordX, animationDuration } = this.state;
    const { images } = this.props;

    return (
      <>
        <div
          className="Carousel"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${coordX > 0 ? -coordX : coordX}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
            }}
          >
            {images.map(image => (
              <li key={image}>
                <img
                  src={image}
                  alt="1"
                  style={{ width: itemWidth }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="Carousel__button--prev"
          onClick={() => {
            this.swipe('prev');
          }}
        >
          ←
        </button>

        <button
          data-cy="Next"
          type="button"
          className="Carousel__button--next"
          onClick={() => {
            this.swipe('next');
          }}
        >
          →
        </button>

        <br />

        <input
          type="number"
          placeholder="Width of item"
          className="Carousel__input"
          onChange={(e) => {
            this.setState({ itemWidth: +e.target.value });
          }}
        />

        <input
          type="number"
          placeholder="Frame size"
          className="Carousel__input"
          onChange={(e) => {
            this.setState({ frameSize: +e.target.value });
          }}
        />

        <input
          type="text"
          placeholder="Step"
          className="Carousel__input"
          onChange={(e) => {
            this.setState({ step: +e.target.value });
          }}
        />

        <input
          type="text"
          placeholder="Animation duration"
          className="Carousel__input"
          onChange={(e) => {
            this.setState({ animationDuration: +e.target.value });
          }}
        />

        <label htmlFor="">
          Do you wanna make me infinite?
          <input
            type="checkbox"
            placeholder="Animation duration"
            className="Carousel__input"
            onChange={(e) => {
              this.setState({ isFinite: e.target.checked });
            }}
          />
        </label>
      </>
    );
  }
}

export default Carousel;
