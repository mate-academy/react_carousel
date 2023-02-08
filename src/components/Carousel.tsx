import React from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  scrollValue: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    scrollValue: 0,
  };

  scrollRight = () => {
    const {
      images,
      frameSize,
      step,
      itemWidth,
      infinite,
    } = this.props;

    const maxScrollValue = itemWidth * (images.length - frameSize);

    this.setState(({ scrollValue }) => ({
      scrollValue: scrollValue > maxScrollValue - step * itemWidth
        ? maxScrollValue
        : scrollValue + step * itemWidth,
    }));

    if (infinite && this.state.scrollValue === maxScrollValue) {
      this.setState({ scrollValue: 0 });
    }
  };

  scrollLeft = () => {
    const {
      images,
      frameSize,
      step,
      itemWidth,
      infinite,
    } = this.props;

    const maxScrollValue = itemWidth * (images.length - frameSize);

    if (infinite && this.state.scrollValue === 0) {
      this.setState({ scrollValue: maxScrollValue });
    }

    this.setState(({ scrollValue }) => ({
      scrollValue: scrollValue < step * itemWidth
        ? 0
        : scrollValue - step * itemWidth,
    }));

    if (infinite && this.state.scrollValue === 0) {
      this.setState({ scrollValue: maxScrollValue });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const {
      scrollValue,
    } = this.state;

    const widthOfWrapper = frameSize * itemWidth;
    const maxScrollValue = itemWidth * (images.length - frameSize);

    return (
      <div className="Carousel">
        <button
          type="button"
          className={classNames(
            'Carousel__button',
            { 'Carousel__button--disabled': !infinite && scrollValue === 0 },
          )}
          onClick={this.scrollLeft}
        >
          &lt;
        </button>

        <div
          className="Carousel__wrapper"
          style={{ width: `${widthOfWrapper}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translate(-${scrollValue}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, i) => (
              <li key={image}>
                <img
                  src={`${image}`}
                  alt={`${i + 1}`}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          data-cy="next"
          type="button"
          className={classNames(
            'Carousel__button',
            {
              'Carousel__button--disabled': !infinite
              && scrollValue === maxScrollValue,
            },
          )}
          onClick={this.scrollRight}
        >
          &gt;
        </button>
      </div>
    );
  }
}

export default Carousel;
