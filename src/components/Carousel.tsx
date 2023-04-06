import { Component } from 'react';
import './Carousel.scss';

type State = {
  position: number,
};

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  handleButton = (pos: number, step: number, max: number, loop: boolean) => {
    let move = pos + step;

    if (step > 0) {
      if (move === step && loop) {
        move = max;
      }

      if (move > 0) {
        move = 0;
      }
    }

    if (step < 0) {
      if ((move === max + step) && loop) {
        move = 0;
      }

      if (move < max) {
        move = max;
      }
    }

    this.setState({ position: move });
  };

  render() {
    const { position } = this.state;

    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const stepSize = step * itemWidth;
    const maxPosition = -itemWidth * (images.length - frameSize);

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{ width: `${frameSize * itemWidth}px` }}
          >
            {images.map((img, index) => (
              <li
                className="Carousel__item"
                style={{
                  transform: `translateX(${position}px)`,
                  transition: `${animationDuration}ms`,
                }}
                key={img}
              >
                <img
                  src={img}
                  alt={`${index + 1}`}
                  style={{ width: itemWidth }}
                />
              </li>
            ))}
          </ul>

          <div className="buttons">
            <button
              type="button"
              className="buttons__button"
              onClick={() => (
                this.handleButton(position, stepSize, maxPosition, infinite)
              )}
              disabled={position === 0 && !infinite}
            >
              {'<'}
            </button>
            <button
              type="button"
              className="buttons__button"
              data-cy="next"
              onClick={() => (
                this.handleButton(position, -stepSize, maxPosition, infinite)
              )}
              disabled={position === maxPosition && !infinite}
            >
              {'>'}
            </button>
          </div>
        </div>
      </>
    );
  }
}
