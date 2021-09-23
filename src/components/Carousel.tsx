import React, { RefObject } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  step: number,
  infinite: boolean,
}

interface State {
  scrollPosition: number,
}

type ScrollDirection = 'prev' | 'next';

class Carousel extends React.Component<Props, State> {
  state = {
    scrollPosition: 0,
  };

  listRef: RefObject<HTMLUListElement> = React.createRef();

  calculateOffset = (direction: ScrollDirection) => {
    const {
      step,
      frameSize,
      itemWidth,
      infinite,
      images,
    } = this.props;
    const { scrollPosition } = this.state;

    const listWidth = images.length * itemWidth;
    const maxScrollPosition = -(listWidth - (frameSize * itemWidth));
    const offsetStep = step * itemWidth;
    let offset = direction === 'prev' ? offsetStep : -offsetStep;
    const predictedScrollPosition = scrollPosition + offset;

    if (infinite) {
      if (scrollPosition === 0 && direction === 'prev') {
        offset = maxScrollPosition;

        return offset;
      }

      if (scrollPosition === maxScrollPosition && direction === 'next') {
        offset = -maxScrollPosition;

        return offset;
      }
    }

    if (predictedScrollPosition > 0) {
      offset -= predictedScrollPosition;
    }

    if (predictedScrollPosition < maxScrollPosition) {
      offset -= (predictedScrollPosition - maxScrollPosition);
    }

    return offset;
  };

  setScrollPosition = (direction: ScrollDirection) => {
    this.setState((state) => {
      const offset = this.calculateOffset(direction);

      return {
        scrollPosition: state.scrollPosition + offset,
      };
    });
  };

  isScrollImpossible = (direction: ScrollDirection) => {
    const offset = this.calculateOffset(direction);

    return offset === 0;
  };

  applyListAnimation = () => {
    const { scrollPosition } = this.state;
    const { animationDuration } = this.props;

    if (this.listRef.current) {
      this.listRef.current.animate([
        { transform: `translateX(${scrollPosition}px)` },
      ],
      {
        duration: animationDuration,
        easing: 'ease-in-out',
        fill: 'forwards',
      });
    }
  };

  render() {
    const { images, itemWidth, frameSize } = this.props;
    const containerSize = itemWidth * frameSize;

    this.applyListAnimation();

    return (
      <div className="carousel">
        <div
          className="carousel__list-container"
          style={{ width: `${containerSize}px` }}
        >
          <ul id="list" ref={this.listRef} className="carousel__list">
            {images.map((imageUrl, i) => (
              <li key={i.toString()}>
                <img
                  src={imageUrl}
                  alt={i.toString()}
                  className="image"
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>

          <div className="buttons">
            <button
              className="button"
              type="button"
              onClick={() => {
                this.setScrollPosition('prev');
              }}
              disabled={this.isScrollImpossible('prev')}
            >
              Prev
            </button>
            <button
              className="button"
              type="button"
              onClick={() => {
                this.setScrollPosition('next');
              }}
              disabled={this.isScrollImpossible('next')}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
