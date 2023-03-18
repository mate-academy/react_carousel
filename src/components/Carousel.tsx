import React from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
    * (this.props.images.length - this.props.frameSize)
    * this.props.itemWidth;

  handleClick = (isNextButton: boolean) => {
    const ribbonOffsetDirection = isNextButton ? -1 : 1;
    const ribbonOffsetComparer = isNextButton
      ? this.rightOffsetLimit
      : this.leftOffsetLimit;

    return () => (
      this.setState((state) => {
        const {
          step,
          itemWidth,
        } = this.props;

        const requestedOffset = state.ribbonAbsoluteOffset
          + step * itemWidth * ribbonOffsetDirection;

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
    } = this.props;

    const { ribbonAbsoluteOffset } = this.state;

    const isPreviousButtonDisable
      = this.leftOffsetLimit === ribbonAbsoluteOffset;
    const isNextButtonDisable
      = this.rightOffsetLimit === ribbonAbsoluteOffset;

    return (
      <div className="Carousel">
        <div
          className="Carousel__frame"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <ul
            className="Carousel__ribbon"
            style={{
              transform: `translateX(${ribbonAbsoluteOffset}px)`,
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
