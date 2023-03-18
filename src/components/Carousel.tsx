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
  ribbonAbsoluteOffset: number;
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    ribbonAbsoluteOffset: 0,
  };

  private readonly leftOffsetLimit = 0;

  private readonly rightOffsetLimit = (-1)
    * (this.props.images.length - this.props.frameSize);

  private get isLeftLimitReached() {
    return this.state.ribbonAbsoluteOffset === this.leftOffsetLimit;
  }

  private get isRightLimitReached() {
    return this.state.ribbonAbsoluteOffset === this.rightOffsetLimit;
  }

  handleClick = (isNextButton: boolean) => {
    const ribbonOffsetDirection = isNextButton ? -1 : 1;
    const ribbonOffsetComparer = isNextButton
      ? this.rightOffsetLimit
      : this.leftOffsetLimit;

    return () => (
      this.setState((state) => {
        const {
          step,
          infinite,
        } = this.props;

        if (
          infinite
          && this.isLeftLimitReached
          && !isNextButton
        ) {
          return { ribbonAbsoluteOffset: this.rightOffsetLimit };
        }

        if (
          infinite
          && this.isRightLimitReached
          && isNextButton
        ) {
          return { ribbonAbsoluteOffset: this.leftOffsetLimit };
        }

        const requestedOffset = state.ribbonAbsoluteOffset
          + step * ribbonOffsetDirection;

        const requestedOffsetNormalized
          = ribbonOffsetDirection * requestedOffset;
        const ribbonOffsetComparerNormalized
          = ribbonOffsetDirection * ribbonOffsetComparer;

        const ribbonAbsoluteOffset = (
          requestedOffsetNormalized
          > ribbonOffsetComparerNormalized
        )
          ? ribbonOffsetComparer
          : requestedOffset;

        return { ribbonAbsoluteOffset };
      })
    );
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { ribbonAbsoluteOffset } = this.state;

    const isPreviousButtonDisable = this.isLeftLimitReached && !infinite;
    const isNextButtonDisable = this.isRightLimitReached && !infinite;

    return (
      <div className="Carousel">
        <div
          className="Carousel__frame"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <ul
            className="Carousel__ribbon"
            style={{
              transform: `translateX(${ribbonAbsoluteOffset * itemWidth}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((image, i) => (
              <li key={image}>
                <img
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
            onClick={this.handleClick(false)}
          >
            &#8592;
          </button>
          <button
            type="button"
            className={classNames(
              'Carousel__button',
              {
                'Carousel__button--disabled': isNextButtonDisable,
              },
            )}
            onClick={this.handleClick(true)}
          >
            &#8594;
          </button>
        </div>
      </div>
    );
  }
}
