import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Carousel.scss';

interface Props {
  images: string[],
}

interface State {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  isInfinite: boolean,
  marginLeft: number,
  isDisablePrev: boolean;
  isDisableNext: boolean;
}

type Way = 'left' | 'rigth';

export class Carousel extends Component<Props, State> {
  ids = new Array<string>(this.props.images.length)
    .fill('')
    .map(el => el + uuidv4());

  state: State = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    isInfinite: false,
    marginLeft: 0,
    isDisablePrev: true,
    isDisableNext: false,
  };

  moveTo = (way: Way) => {
    const {
      step,
      itemWidth,
      frameSize,
      isInfinite,
    } = this.state;

    const minMarginLeft = -itemWidth * (this.props.images.length - frameSize);

    this.setState(prevState => {
      let marginLeft = way === 'left'
        ? prevState.marginLeft + itemWidth * step
        : prevState.marginLeft - itemWidth * step;

      if (prevState.marginLeft === 0 && isInfinite && way === 'left') {
        marginLeft = minMarginLeft;
      } else if (marginLeft > 0) {
        marginLeft = 0;
      } else if (prevState.marginLeft === minMarginLeft && isInfinite
        && way === 'rigth') {
        marginLeft = 0;
      } else if (marginLeft < minMarginLeft) {
        marginLeft = minMarginLeft;
      }

      return ({
        marginLeft,
        isDisablePrev: marginLeft === 0,
        isDisableNext: marginLeft === minMarginLeft,
      });
    });
  };

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      isInfinite,
      marginLeft,
      isDisablePrev,
      isDisableNext,
    } = this.state;
    const { images } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <label className="Carousel__label">
          Step:
          <input
            className="Carousel__input"
            type="number"
            value={step}
            min="1"
            max={frameSize}
            step="1"
            onChange={(event) => (
              this.setState({ step: +event.target.value })
            )}
          />
        </label>

        <label className="Carousel__label">
          Frame size:
          <input
            className="Carousel__input"
            type="number"
            value={frameSize}
            min="3"
            max={1300 / itemWidth}
            step="1"
            onChange={(event) => (
              this.setState(
                { frameSize: +event.target.value, marginLeft: 0 },
              )
            )}
          />
        </label>

        <label className="Carousel__label">
          item Width:
          <input
            className="Carousel__input"
            type="number"
            value={itemWidth}
            min="130"
            max={1300 / frameSize}
            step="10"
            onChange={(event) => (
              this.setState({ itemWidth: +event.target.value, marginLeft: 0 })
            )}
          />
        </label>

        <label className="Carousel__label">
          Animation duration:
          <input
            className="Carousel__input"
            type="number"
            value={animationDuration}
            min="300"
            max="2000"
            step="100"
            onChange={(event) => (
              this.setState({ animationDuration: +event.target.value })
            )}
          />
        </label>

        <label className="Carousel__label">
          Infinite carousel:
          <input
            className="Carousel__input"
            type="checkbox"
            checked={isInfinite}
            onChange={(event) => (
              this.setState({ isInfinite: event.target.checked })
            )}
          />
        </label>

        <ul
          className="Carousel__list"
          style={{
            marginLeft: `${marginLeft}px`,
            transition: `margin ${animationDuration}ms linear`,
          }}
        >
          {images.map((image, index) => (
            <li key={this.ids[index]}>
              <img src={image} width={`${itemWidth}px`} alt={`${index}`} />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            disabled={isInfinite ? false : isDisablePrev}
            onClick={() => this.moveTo('left')}
          >
            Prev
          </button>

          <button
            data-cy="next"
            className="Carousel__button"
            type="button"
            disabled={isInfinite ? false : isDisableNext}
            onClick={() => this.moveTo('rigth')}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
