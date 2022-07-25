import React from 'react';
import './Carousel.scss';
import { ValuesType } from '../Types/ValuesType';

type State = {
  leftPosition: number,
  disabledPrevButton?: boolean,
  disabledNextButton?: boolean,
};

class Carousel extends React.Component<ValuesType, State> {
  state: Readonly<State> = {
    leftPosition: 0,
    disabledPrevButton: true,
    disabledNextButton: false,
  };

  handlerNextButton = (value: number) => {
    const {
      images,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;

    const maxLeftPosition = -((itemWidth * images.length)
    - (itemWidth * frameSize));

    this.setState({ disabledPrevButton: false });

    this.setState((prevState) => {
      if (infinite && prevState.leftPosition === maxLeftPosition) {
        return { leftPosition: 0 };
      }

      if (infinite && prevState.leftPosition - value <= maxLeftPosition) {
        return { leftPosition: maxLeftPosition, disabledNextButton: false };
      }

      if (prevState.leftPosition - value <= maxLeftPosition) {
        return { leftPosition: maxLeftPosition, disabledNextButton: true };
      }

      return { leftPosition: prevState.leftPosition - value };
    });
  };

  handlerPrevButton = (value: number) => {
    const {
      images,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;

    this.setState({ disabledNextButton: false });

    if (!infinite && this.state.leftPosition === 0) {
      this.setState({ disabledPrevButton: true });
    }

    const maxLeftPosition = -((itemWidth * images.length)
    - (itemWidth * frameSize));

    this.setState((prevState) => {
      if (infinite && prevState.leftPosition === 0) {
        return { leftPosition: maxLeftPosition };
      }

      if (!infinite && prevState.leftPosition + value >= 0) {
        return { leftPosition: 0, disabledPrevButton: true };
      }

      if (prevState.leftPosition + value >= 0) {
        return { leftPosition: 0 };
      }

      return { leftPosition: prevState.leftPosition + value };
    });
  };

  render(): React.ReactNode {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { leftPosition, disabledPrevButton, disabledNextButton } = this.state;

    return (
      <div className="Carousel">
        <button
          type="button"
          className="button"
          disabled={disabledPrevButton}
          onClick={() => {
            this.handlerPrevButton(itemWidth * step);
          }}
        >
          &#60;
        </button>

        <div
          className="Carousel__list-container"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${itemWidth * images.length}px`,
              left: leftPosition === 0 ? 0 : (`${leftPosition}px`),
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li
                key={image}
                className="Carousel__item"
              >
                <img
                  src={image}
                  alt={String(index)}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="button"
          data-cy="next"
          disabled={disabledNextButton}
          onClick={() => {
            this.handlerNextButton(itemWidth * step);
          }}
        >
          &#62;
        </button>
      </div>
    );
  }
}

export default Carousel;
