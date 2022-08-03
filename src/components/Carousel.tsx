import { ChangeEvent, Component } from 'react';

import { v4 as uuidv4 } from 'uuid';
import './Carousel.scss';

const idsFromServer: string[] = [];

for (let i = 0; i < 10; i += 1) {
  idsFromServer[i] = (uuidv4());
}

type Props = {
  images: string[];
};

type State = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  translateFrame: number,
  isDisabledPrev: boolean;
  isDisabledNext: boolean;
};

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    translateFrame: 0,
    isDisabledPrev: true,
    isDisabledNext: false,
  };

  onClickBut = (side: number) => {
    const {
      step, frameSize, itemWidth,
    } = this.state;

    this.setState(prevState => {
      const maxScroll = (this.props.images.length - frameSize) * itemWidth;
      let scrollWidth = prevState.translateFrame - (step * itemWidth * side);

      if (scrollWidth >= 0) {
        scrollWidth = 0;
      }

      if (scrollWidth <= -maxScroll) {
        scrollWidth = -maxScroll;
      }

      return {
        translateFrame: scrollWidth,
        isDisabledPrev: scrollWidth === 0,
        isDisabledNext: scrollWidth === -maxScroll,
      };
    });
  };

  changeItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value, translateFrame: 0 });
  };

  render() {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      translateFrame,
      isDisabledPrev,
      isDisabledNext,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <label className="Carousel__label label">
          Step:
          <input
            type="number"
            min="1"
            max={frameSize}
            step="1"
            value={step}
            className="Carousel__input input"
            onChange={(event) => this.setState({ step: +event.target.value })}
          />
        </label>

        <label className="Carousel__label label">
          Frame size:
          <input
            type="number"
            min="3"
            max={1300 / itemWidth}
            step="1"
            value={frameSize}
            className="Carousel__input input"
            onChange={(event) => (
              this.setState({ frameSize: +event.target.value })
            )}
          />
        </label>

        <label className="Carousel__label label">
          Item width:
          <input
            type="number"
            min="130"
            max="300"
            step="10"
            value={itemWidth}
            className="Carousel__input input"
            onChange={this.changeItemWidth}
          />
        </label>

        <label className="Carousel__label label">
          Animation duration:
          <input
            type="number"
            min="100"
            max="3000"
            step="100"
            value={animationDuration}
            className="Carousel__input input"
            onChange={(event) => (
              this.setState({ animationDuration: +event.target.value })
            )}
          />
        </label>

        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateFrame}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, i) => (
            <li
              key={idsFromServer[i]}
              className="Carousel__item"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={`${i}`}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="buttons">
          <button
            type="button"
            className="button is-dark"
            disabled={isDisabledPrev}
            onClick={() => this.onClickBut(-1)}
          >
            Prev
          </button>

          <button
            data-cy="next"
            type="button"
            className="button is-dark"
            disabled={isDisabledNext}
            onClick={() => this.onClickBut(1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
