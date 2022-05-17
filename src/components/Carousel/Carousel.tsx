import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

interface State {
  currentPosition: number;
}

export class Carousel extends React.Component<Props, State> {
  state: State = {
    currentPosition: 0,
  };

  scrollLeft = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const { currentPosition } = this.state;

    const stepWidth = itemWidth * step;
    const maxShift = (images.length - frameSize) * itemWidth * -1;
    const expectedShift = currentPosition + stepWidth;

    if (expectedShift > 0) {
      this.setState({ currentPosition: 0 });
    } else {
      this.setState((state) => ({
        currentPosition: state.currentPosition + stepWidth,
      }));
    }

    if (infinite) {
      if (currentPosition === 0) {
        this.setState({ currentPosition: maxShift });
      }
    }
  };

  scrollRight = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const { currentPosition } = this.state;

    const stepWidth = step * itemWidth;
    const maxShift = (images.length - frameSize) * itemWidth * -1;
    const expectedShift = currentPosition - stepWidth;

    if (expectedShift < maxShift) {
      this.setState({ currentPosition: maxShift });
    } else {
      this.setState({ currentPosition: expectedShift });
    }

    if (infinite) {
      if (currentPosition === maxShift) {
        this.setState({ currentPosition: 0 });
      }
    }
  };

  render(): React.ReactNode {
    const {
      images,
      frameSize,
      itemWidth,
      infinite,
      animationDuration,
    } = this.props;

    const { currentPosition } = this.state;

    const maxShift = (images.length - frameSize) * itemWidth * -1;
    const listWidth = frameSize * itemWidth;

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={{ width: listWidth }}>
          {images.map(image => {
            return (
              <li
                className="Carousel__image"
                key={image}
              >
                <img
                  src={image}
                  alt={`${image.replace(/\D/g, '')}`}
                  style={{
                    width: itemWidth,
                    transform: `translateX(${currentPosition}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={currentPosition === 0 && !infinite}
            onClick={this.scrollLeft}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            disabled={currentPosition === maxShift && !infinite}
            onClick={this.scrollRight}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
