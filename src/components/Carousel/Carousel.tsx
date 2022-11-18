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
  position: number;
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
  };

  handleNextClick = () => {
    const { position } = this.state;
    const {
      infinite,
      images,
      itemWidth,
      step,
      frameSize,
    } = this.props;

    const maxRight = itemWidth * (frameSize - images.length);
    const stepWidth = itemWidth * step;
    const currentLeft = Math.max((position - stepWidth), maxRight);

    this.setState({
      position: (position === maxRight && infinite)
        ? 0
        : currentLeft,
    });
  };

  handlePrevClick = () => {
    const { position } = this.state;
    const {
      infinite,
      images,
      itemWidth,
      step,
      frameSize,
    } = this.props;

    const maxRight = itemWidth * (frameSize - images.length);
    const stepWidth = itemWidth * step;
    const currentLeft = Math.min((position + stepWidth), 0);

    this.setState({
      position: (position === 0 && infinite)
        ? maxRight
        : currentLeft,
    });
  };

  render() {
    const { position } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    return (
      <div className="Carousel">
        <button
          type="button"
          className="Arrow Arrow--Prev"
          disabled={(!infinite && position === 0)}
          onClick={this.handlePrevClick}
        >
          ⇦
        </button>

        <div
          className="Carousel__container"
          style={{
            width: `${frameSize * itemWidth}px`,
            height: `${itemWidth}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${images.length * itemWidth}px`,
              marginLeft: `${position}px`,
              transition: `margin-left ${animationDuration}ms`,
            }}
          >
            {images.map((imageUrl, index) => (
              <li
                key={imageUrl}
                className="Carousel__item"
              >
                <img
                  className="Carousel__image"
                  src={imageUrl}
                  alt={`${index + 1}`}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          data-cy="next"
          type="button"
          disabled={
            !infinite && position === itemWidth * (frameSize - images.length)
          }
          className="Arrow Arrow--Next"
          onClick={this.handleNextClick}
        >
          ⇨
        </button>
      </div>
    );
  }
}
