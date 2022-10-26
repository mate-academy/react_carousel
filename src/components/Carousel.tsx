import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

interface State {
  position: number;
}

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  handlePrevClick = () => {
    this.setState(({ position }) => (
      (position === 0)
        ? { position }
        : { position: Math.min(position + this.props.step, 0) }
    ));
  };

  handleNextClick = () => {
    const {
      images,
      frameSize,
      step,
    } = this.props;

    this.setState(({ position }) => (
      (position === -(images.length - frameSize))
        ? { position }
        : { position: Math.max(-(images.length - frameSize), position - step) }
    ));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const { position } = this.state;

    return (
      <div
        className="Carousel box"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * images.length}px`,
            transform: `translateX(${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image: string) => (
            <li
              className="Carousel__item"
              key={image}
            >
              <img
                src={image}
                alt={`smile-${images.indexOf(image) + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            disabled={position === 0}
            className="button is-link is-outlined"
            onClick={this.handlePrevClick}
          >
            {'<< Prev'}
          </button>
          <button
            data-cy="next"
            type="button"
            disabled={position === -(images.length - frameSize)}
            className="button is-link is-outlined"
            onClick={this.handleNextClick}
          >
            {'Next >>'}
          </button>
        </div>
      </div>
    );
  }
}
