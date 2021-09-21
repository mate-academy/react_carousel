import React from 'react';
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

type ApplyStyles = Pick<Props, 'itemWidth' | 'frameSize' | 'animationDuration'> & State;

const applyStyles = ({
  scrollPosition,
  itemWidth,
  frameSize,
  animationDuration,
}: ApplyStyles) => {
  const list = document.getElementById('list');
  const images = document.querySelectorAll<HTMLElement>('.image');
  const container = document.getElementById('container');

  if (list) {
    list.animate([
      { transform: `translateX(${scrollPosition}px)` },
    ],
    {
      duration: animationDuration,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }

  if (container) {
    container.style.width = `${itemWidth * frameSize}px`;
  }

  for (let i = 0; i < images.length; i += 1) {
    images[i].style.width = `${itemWidth}px`;
  }
};

class Carousel extends React.Component<Props, State> {
  state = {
    scrollPosition: 0,
  };

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

  render() {
    const { images } = this.props;
    const { scrollPosition } = this.state;

    applyStyles({ scrollPosition, ...this.props });

    return (
      <div className="carousel">
        <div
          id="container"
          className="carousel__list-container"
        >
          <ul id="list" className="carousel__list">
            {images.map((imageUrl, i) => (
              <li key={i.toString()}>
                <img
                  src={imageUrl}
                  alt={i.toString()}
                  className="image"
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
