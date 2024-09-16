import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  position: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  handleNextButtonClick = () => {
    const { position } = this.state;
    const {
      images,
      itemWidth,
      frameSize,
      step,
      infinite,
    } = this.props;

    const stepWidth = step * itemWidth;
    const maxRightPosition = itemWidth * (frameSize - images.length);
    const offset = Math.max((position - stepWidth), maxRightPosition);

    this.setState({
      position: (infinite && position === maxRightPosition)
        ? 0
        : offset,
    });
  };

  handlePreviousButtonClick = () => {
    const { position } = this.state;
    const {
      images,
      itemWidth,
      frameSize,
      step,
      infinite,
    } = this.props;

    const stepWidth = step * itemWidth;
    const maxLeftPosition = itemWidth * (frameSize - images.length);
    const offset = Math.min((position + stepWidth), 0);

    this.setState({
      position: (infinite && position === 0)
        ? maxLeftPosition
        : offset,
    });
  };

  render() {
    const { position } = this.state;
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{
            width: `${itemWidth * frameSize}px`,
            height: `${itemWidth}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${itemWidth * images.length}px`,
              marginLeft: `${position}px`,
              transition: `margin-left ${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li className="Carousel__list-item" key={image}>
                <img
                  className="Carousel__image"
                  src={image}
                  alt={index.toString()}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            onClick={this.handlePreviousButtonClick}
            disabled={!infinite && position === 0}
          >
            ⇦
          </button>
          <button
            data-cy="next"
            type="button"
            className="Carousel__button"
            onClick={this.handleNextButtonClick}
            disabled={
              !infinite && position === itemWidth * (frameSize - images.length)
            }
          >
            ⇨
          </button>
        </div>
      </div>
    );
  }
}
