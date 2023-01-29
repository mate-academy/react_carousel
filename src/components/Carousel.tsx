import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  move: number,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    move: 0,
  };

  next = () => {
    const {
      step,
      itemWidth,
      frameSize,
      images,
      infinite,
    } = this.props;

    const maxMove = (images.length * itemWidth) - (frameSize * itemWidth);

    if (infinite && this.state.move === -maxMove) {
      this.setState({
        move: (frameSize * itemWidth),
      });
    }

    this.setState(prevState => ({
      move: (prevState.move - (step * itemWidth)) <= -maxMove
        ? -maxMove
        : (prevState.move - (step * itemWidth)),
    }));
  };

  prev = () => {
    const {
      step,
      itemWidth,
      images,
      infinite,
    } = this.props;

    if (infinite && this.state.move >= 0) {
      this.setState({
        move: -(images.length * itemWidth),
      });
    }

    this.setState(prevState => ({
      move: (prevState.move + (step * itemWidth)) > 0
        ? 0
        : (prevState.move + (step * itemWidth)),
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const { move } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Container"
          style={{ width: itemWidth * frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translate(${move}px)`, transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map(image => (
              <li
                key={image}
                className="Carousel__item"
              >
                <img
                  src={image}
                  alt="img"
                  style={{ width: itemWidth }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            onClick={this.prev}
          >
            Prev
          </button>
          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            onClick={this.next}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
