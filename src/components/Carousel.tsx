import React from 'react';
import classNames from 'classnames';
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
  offset: number;
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    offset: 0,
  };

  private readonly leftLimit = 0;

  private get rightLimit() {
    return this.props.images.length - this.props.frameSize;
  }

  private get isLeftLimitReached() {
    return this.state.offset === this.leftLimit;
  }

  private get isRightLimitReached() {
    return this.state.offset === this.rightLimit;
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const rightLimit = props.images.length - props.frameSize;

    if (state.offset > rightLimit) {
      return { offset: rightLimit };
    }

    return null;
  }

  handleNextClick = () => (
    this.setState((state) => {
      const {
        step,
        infinite,
      } = this.props;

      const {
        leftLimit,
        rightLimit,
        isRightLimitReached,
      } = this;

      if (infinite && isRightLimitReached) {
        return { offset: leftLimit };
      }

      const requestedOffset = state.offset + step;

      const offset = (requestedOffset > rightLimit)
        ? rightLimit
        : requestedOffset;

      return { offset };
    })
  );

  handlePreviousClick = () => (
    this.setState((state) => {
      const {
        step,
        infinite,
      } = this.props;

      const {
        leftLimit,
        rightLimit,
        isLeftLimitReached,
      } = this;

      if (infinite && isLeftLimitReached) {
        return { offset: rightLimit };
      }

      const requestedOffset = state.offset - step;

      const offset = (requestedOffset < leftLimit)
        ? leftLimit
        : requestedOffset;

      return { offset };
    })
  );

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { offset } = this.state;

    const absoluteFrameSize = frameSize * itemWidth;
    const absoluteCarouselOffset = (-1) * offset * itemWidth;

    const isPreviousButtonDisable = this.isLeftLimitReached && !infinite;
    const isNextButtonDisable = this.isRightLimitReached && !infinite;

    return (
      <div className="Carousel">
        <div
          className="Carousel__frame"
          style={{ width: `${absoluteFrameSize}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${absoluteCarouselOffset}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((image, i) => (
              <li className="Carousel__item" key={image}>
                <img
                  width={`${itemWidth}`}
                  className="Carousel__image"
                  src={image}
                  alt={`${i}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__controls">
          <button
            type="button"
            className={classNames(
              'Carousel__button',
              {
                'Carousel__button--disabled': isPreviousButtonDisable,
              },
            )}
            onClick={this.handlePreviousClick}
          >
            &#8592;
          </button>

          <button
            type="button"
            data-cy="next"
            className={classNames(
              'Carousel__button',
              {
                'Carousel__button--disabled': isNextButtonDisable,
              },
            )}
            onClick={this.handleNextClick}
          >
            &#8594;
          </button>
        </div>
      </div>
    );
  }
}
