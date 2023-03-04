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
  isNextDisabled: boolean,
  isPrevDisabled: boolean,
};

class Carousel extends Component<Props, State> {
  state: State = {
    isFinite: this.props.isFiniteCarousel,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    isNextDisabled: false,
    isPrevDisabled: true,
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
        } else if (coordX + oneStepWidth >= limit && isFinite) {
          this.setState({
            coordX: limit,
            isNextDisabled: false,
          });
        } else if (coordX + oneStepWidth >= limit) {
          this.setState({
            coordX: limit,
            isNextDisabled: true,
          });
        } else {
          this.setState(state => ({
            coordX: state.coordX + state.step * state.itemWidth,
            isPrevDisabled: false,
          }));
        }

        break;

      case 'prev':
        if (coordX === 0 && isFinite) {
          this.setState({ coordX: limit });
        } else if (coordX <= oneStepWidth && isFinite) {
          this.setState({
            coordX: 0,
            isPrevDisabled: false,
          });
        } else if (coordX <= oneStepWidth) {
          this.setState({
            coordX: 0,
            isPrevDisabled: true,
          });
        } else {
          this.setState(state => ({
            coordX: state.coordX - state.step * state.itemWidth,
            isNextDisabled: false,
          }));
        }

        break;

      default:
        break;
    }
  };

  limit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { min, max, name, value } = target;

    if (+value < +min) {
      this.setState(state => {
        return {
          ...state,
          [name]: min,
        };
      });
    } else if (+value > +max) {
      this.setState(state => {
        return {
          ...state,
          [name]: max,
        };
      });
    } else {
      this.setState(state => {
        return {
          ...state,
          [name]: +value,
        };
      });
    }
  };

  setInfinity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    this.setState({
      isFinite: isChecked,
      isPrevDisabled: false,
      isNextDisabled: false,
    });
  };

  render() {
    const {
      frameSize,
      itemWidth,
      coordX,
      animationDuration,
      isNextDisabled,
      isPrevDisabled,
    } = this.state;
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
          disabled={isPrevDisabled}
          onClick={() => {
            this.swipe('prev');
          }}
        >
          ←
        </button>

        <button
          data-cy="Next"
          type="button"
          disabled={isNextDisabled}
          className="Carousel__button--next"
          onClick={() => {
            this.swipe('next');
          }}
        >
          →
        </button>

        <br />

        <label className="Carousel__label">
          Width of item, px
          <input
            min={100}
            max={300}
            defaultValue={130}
            type="number"
            name="itemWidth"
            className="Carousel__input"
            onChange={this.limit}
          />
        </label>

        <label className="Carousel__label">
          Size of frame, picture
          <input
            min={1}
            max={images.length}
            defaultValue={3}
            type="number"
            name="frameSize"
            className="Carousel__input"
            onChange={this.limit}
          />
        </label>

        <label className="Carousel__label">
          Step, picture
          <input
            min={1}
            max={images.length}
            defaultValue={3}
            type="number"
            name="step"
            className="Carousel__input"
            onChange={this.limit}
          />
        </label>

        <label className="Carousel__label">
          Animation duration, ms
          <input
            min={100}
            max={5000}
            defaultValue={1000}
            type="number"
            name="animationDuration"
            className="Carousel__input"
            onChange={this.limit}
          />
        </label>

        <label className="Carousel__label">
          Make the carousel infinite?
          <input
            type="checkbox"
            className="Carousel__input"
            onChange={this.setInfinity}
          />
        </label>
      </>
    );
  }
}

export default Carousel;
