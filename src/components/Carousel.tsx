/* eslint-disable prefer-const */
import classNames from 'classnames';
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[]
  step: number
  frameSize: number
  itemWidth: number
  animationDuration: number
  infinite: boolean
};

type State = {
  scroll: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
  };

  render() {
    let {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.props;

    let { scroll } = this.state;
    const scrollLength = (itemWidth / 2) * (images.length - frameSize);

    if (frameSize > images.length) {
      frameSize = images.length;
    }

    if (step > images.length) {
      step = images.length;
    }

    if (scroll > scrollLength) {
      scroll = scrollLength;
    }

    if (scroll < 0) {
      scroll = 0;
    }

    const styleForItem = {
      width: itemWidth,
      transform: `translateX(-${scroll}px)`,
      transition: `all ${animationDuration}ms`,
    };
    const widthForView = {
      width: itemWidth * frameSize,
    };

    return (
      <div className="Carousel">
        <ul
          style={widthForView}
          className={classNames(
            'Carousel__list',
            {
              'Carousel__list--left': scroll === 0 && !infinite,
              'Carousel__list--right': scroll === scrollLength && !infinite,
            },
          )}
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={styleForItem}
              className="Carousel__item"
            >
              <img
                style={styleForItem}
                className="Carousel__image"
                src={image}
                alt={`smille№${index + 1}`}
              />
            </li>
          ))}
        </ul>

        <div className="Button__container">
          <button
            data-cy="prev"
            type="button"
            disabled={scroll === 0 && infinite === false}
            className="Button"
            onClick={() => {
              if (scroll === 0) {
                this.setState({ scroll: scrollLength });

                return;
              }

              this.setState((state) => ({
                scroll: state.scroll - ((itemWidth * step) / 2),
              }));
            }}
          >
            Prev
          </button>
          <button
            data-cy="next"
            type="button"
            disabled={scroll === scrollLength && infinite === false}
            className="Button"
            onClick={() => {
              if (scroll === scrollLength) {
                this.setState({ scroll: 0 });

                return;
              }

              this.setState((state) => ({
                scroll: state.scroll + ((itemWidth * step) / 2),
              }));
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
