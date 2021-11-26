import React, { MouseEventHandler } from 'react';
import './Carousel.scss';

type Props = {
  images: string[]
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  scrollWidth: number;
};

export class Carousel extends React.PureComponent<Props, State> {
  state = {
    scrollWidth: 0,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    let { scrollWidth } = this.state;

    const frameWidth = itemWidth * frameSize;

    const scroller: MouseEventHandler = (e) => {
      this.setState((prevState) => {
        const button = e.target;
        const maxScroll = (images.length * itemWidth) - frameWidth;

        scrollWidth = ((button as HTMLButtonElement).textContent === 'Prev')
          ? scrollWidth - itemWidth * step
          : scrollWidth + itemWidth * step;

        if (prevState.scrollWidth === maxScroll && infinite) {
          scrollWidth = ((button as HTMLButtonElement).textContent === 'Next')
            ? 0
            : scrollWidth;
        }

        if (prevState.scrollWidth === 0 && infinite) {
          scrollWidth = ((button as HTMLButtonElement).textContent === 'Prev')
            ? maxScroll
            : scrollWidth;
        }

        if (maxScroll < scrollWidth) {
          scrollWidth = maxScroll;
        }

        if (scrollWidth < 0) {
          scrollWidth = 0;
        }

        return { scrollWidth };
      });
    };

    return (
      <div className="carousel">
        <ul
          className="carousel__list"
          style={{ width: `${frameWidth}px` }}
        >
          {images.map((image, index) => {
            const imageId = (index + 1).toString();

            return (
              <li
                key={imageId}
                className="carousel__item"
                style={{
                  height: `${itemWidth}px`,
                  transitionDuration: `${animationDuration}ms`,
                  transform: `translate(${-scrollWidth}px)`,
                }}
              >
                <img
                  src={image}
                  alt={imageId}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={scroller}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={scroller}
        >
          Next
        </button>
      </div>
    );
  }
}
