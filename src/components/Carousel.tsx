import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean,
};

type State = {
  position: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  next = (move: boolean): void => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;
    const { position } = this.state;

    const maxTransform = (images.length - frameSize) * itemWidth;

    let countMove = move
      ? position + step * itemWidth
      : position - step * itemWidth;

    if (countMove >= maxTransform) {
      countMove = maxTransform;
      if (infinite) {
        if (maxTransform !== 0) {
          countMove = 0;
        }
      }
    }

    if (countMove < 0) {
      countMove = 0;
    }

    this.setState({ position: countMove });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const size = frameSize * itemWidth;
    const maxTransf = (images.length - frameSize) * itemWidth;

    return (
      <>
        <div
          className="Carousel"
          style={{
            width: `${size}px`,
          }}
        >
          <ul className="Carousel__list">
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  style={{
                    width: `${itemWidth}px`,
                    transform: `translateX(${-position}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                  alt={index.toString()}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            className={(!position && !infinite)
              ? 'buttons__button deactivated'
              : 'buttons__button'}
            type="button"
            onClick={() => this.next(false)}
          >
            &#10232; Prev
          </button>
          <button
            className={(position === maxTransf && !infinite)
              ? 'buttons__button deactivated'
              : 'buttons__button'}
            data-cy="next"
            type="button"
            onClick={() => this.next(true)}
          >
            Next &#10233;
          </button>
        </div>
      </>
    );
  }
}
