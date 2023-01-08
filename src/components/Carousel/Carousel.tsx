import { Component } from 'react';

import './Carousel.scss';

import { Settings } from '../../types/Settings';

type Props = {
  images: string[],
  settings: Settings,
};

type State = {
  position: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
  };

  componentDidUpdate() {
    const { frameSize } = this.props.settings;
    const imageCount = this.props.images.length;
    const { position } = this.state;

    if (position + frameSize > imageCount) {
      this.moveImages('right');
    }
  }

  get maxPosition() {
    return this.props.images.length - this.props.settings.frameSize;
  }

  moveImages = (direction: 'right' | 'left') => {
    const { position } = this.state;
    const { step, infinite } = this.props.settings;
    const { maxPosition } = this;
    const movingRight = direction === 'right';

    let newPosition = movingRight
      ? position + step
      : position - step;

    if (!infinite) {
      newPosition = movingRight
        ? Math.min(newPosition, maxPosition)
        : Math.max(newPosition, 0);

      this.setState({ position: newPosition });

      return;
    }

    if (newPosition > maxPosition) {
      newPosition = position === maxPosition
        ? 0
        : maxPosition;
    }

    if (newPosition < 0) {
      newPosition = position === 0
        ? maxPosition
        : 0;
    }

    this.setState({ position: newPosition });
  };

  render() {
    const { position } = this.state;
    const { images } = this.props;
    const {
      animationDuration, frameSize, itemWidth, infinite,
    } = this.props.settings;
    const frameWidth = frameSize * itemWidth;
    const shift = -(itemWidth * position);
    const { maxPosition } = this;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameWidth}px`,
            left: `${shift}px`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image) => (
            <li
              key={image + Math.random()}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={image}
                alt="1"
                className="Carousel__image"
                width={`${itemWidth}px`}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__actions">
          <button
            type="button"
            onClick={() => this.moveImages('left')}
            className="Carousel__button"
            disabled={!infinite && position === 0}
          >
            {'<'}
          </button>

          <button
            data-cy="next"
            type="button"
            onClick={() => this.moveImages('right')}
            className="Carousel__button"
            disabled={!infinite && position === maxPosition}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
