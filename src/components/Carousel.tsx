import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

type State = {
  scroll: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
  };

  buttonPrev = () => {
    const { step, itemWidth } = this.props;

    this.setState((state) => {
      const scrollprev = state.scroll - (step * itemWidth);

      return (scrollprev >= 0)
        ? { scroll: scrollprev }
        : { scroll: 0 };
    });
  };

  buttonNext = () => {
    const {
      step,
      itemWidth,
      frameSize,
      images,
    } = this.props;

    this.setState((state) => {
      const scrollnext = state.scroll + (step * itemWidth);
      const maxScroll = (images.length - frameSize) * itemWidth;

      return (scrollnext <= maxScroll)
        ? { scroll: scrollnext }
        : { scroll: maxScroll };
    });
  };

  render() {
    const {
      scroll,
    } = this.state;

    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-scroll}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image) => (
            <li
              key={image}
              className="carousel__item"
            >
              <img
                src={image}
                alt="img"
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          className="button"
          type="button"
          onClick={this.buttonPrev}
          disabled={scroll <= 0}
        >
          Prev
        </button>
        <button
          className="button"
          data-cy="next"
          type="button"
          onClick={this.buttonNext}
          disabled={scroll === (images.length - frameSize) * itemWidth}
        >
          Next
        </button>
      </div>
    );
  }
}
