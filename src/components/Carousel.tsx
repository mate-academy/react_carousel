import React from 'react';
import './Carousel.scss';
import { Image } from '../types/Image';

interface State {
  viewPosition: number;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

interface Props {
  images: Image[];
}

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    viewPosition: 0,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  moveImage = (direction: string) => {
    const {
      viewPosition,
      itemWidth,
      frameSize,
      step,
    } = this.state;
    const { images } = this.props;

    const maxSlide = (images.length - frameSize) * itemWidth;

    if (direction === 'forward' && viewPosition < maxSlide) {
      this.setState({ viewPosition: viewPosition + itemWidth * step });

      if (viewPosition + itemWidth * step > maxSlide) {
        this.setState({ viewPosition: maxSlide });
      }
    }

    if (direction === 'back' && viewPosition > 0) {
      this.setState({ viewPosition: viewPosition - itemWidth * step });

      if (viewPosition - itemWidth * step < 0) {
        this.setState({ viewPosition: 0 });
      }
    }
  };

  render() {
    const {
      viewPosition,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;
    const { images } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >

        <label>
          Item Width:
          <input
            type="number"
            value={itemWidth}
            min="130"
            max="250"
            step="5"
            onChange={({ target }) => (
              this.setState({ itemWidth: +target.value })
            )}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            value={frameSize}
            min="1"
            max="10"
            onChange={({ target }) => (
              this.setState({ frameSize: +target.value })
            )}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            value={step}
            min="1"
            max="5"
            onChange={({ target }) => (
              this.setState({ step: +target.value })
            )}
          />
        </label>

        <label>
          Animation Duration:
          <input
            type="number"
            value={animationDuration}
            min="100"
            max="2000"
            step="100"
            onChange={({ target }) => (
              this.setState({ animationDuration: +target.value })
            )}
          />
        </label>

        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${viewPosition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {
            images.map(({ image, id }) => {
              return (
                <li key={id}>
                  <img
                    src={image}
                    alt={image}
                    style={{
                      width: `${itemWidth}px`,
                    }}
                  />
                </li>
              );
            })
          }
        </ul>

        <button
          type="button"
          onClick={() => this.moveImage('back')}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => this.moveImage('forward')}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
