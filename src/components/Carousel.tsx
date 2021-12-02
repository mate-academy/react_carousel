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
  offset: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    offset: 0,
  };

  shouldComponentUpdate(nextProps: Props) {
    const {
      images,
      itemWidth,
      // frameSize,
    } = this.props;
    const { offset } = this.state;
    const maxFrameSize = images.length * itemWidth;

    if (itemWidth !== nextProps.itemWidth) {
      const scrolledImagesCount = offset / itemWidth;

      this.state.offset = nextProps.itemWidth * scrolledImagesCount;
    }

    if (offset + nextProps.frameSize > maxFrameSize) {
      this.state.offset = maxFrameSize - nextProps.frameSize;
    }

    return true;
  }

  scroller: MouseEventHandler = (e) => {
    this.setState((state) => {
      const button = e.target;
      const {
        images,
        step,
        frameSize,
        itemWidth,
        infinite,
      } = this.props;

      const maxScroll = (images.length * itemWidth) - frameSize;

      let scrollWidth: number = ((button as HTMLButtonElement).textContent === 'Prev')
        ? state.offset - step
        : state.offset + step;

      if (state.offset === maxScroll && infinite) {
        scrollWidth = ((button as HTMLButtonElement).textContent === 'Next')
          ? 0
          : scrollWidth;
      }

      if (state.offset === 0 && this.props.infinite) {
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

      return { offset: scrollWidth };
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { offset } = this.state;

    return (
      <div className="carousel">
        <ul
          className="carousel__list"
          style={{ width: `${frameSize}px` }}
        >
          {images.map((image, index) => {
            const imageId = (index + 1).toString();

            return (
              <li
                key={image}
                className="carousel__item"
                style={{
                  height: `${itemWidth}px`,
                  transition: `transform ${animationDuration}ms`,
                  transform: `translate(${-offset}px)`,
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
          onClick={this.scroller}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.scroller}
        >
          Next
        </button>
      </div>
    );
  }
}
