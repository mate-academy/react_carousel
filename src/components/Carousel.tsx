import React from 'react';
import './Carousel.scss';

function generateKeys(count: number): number[] {
  const keys = [];

  for (let i = 0; i < count; i += 1) {
    keys.push(i);
  }

  return keys;
}

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  currentX: number;
  currentItem: number;
  isScrolling: boolean;
};

// eslint-disable-next-line
class Carousel extends React.Component<Props, State> {
  state = {
    currentX: 0,
    currentItem: 0,
    isScrolling: false,
  };

  getCurrentImages(): string[] {
    const { currentItem } = this.state;
    const { step, frameSize, images } = this.props;

    const start = currentItem - step;
    const end = currentItem + frameSize + step;
    const currentImages = [];

    for (let i = start; i < end; i += 1) {
      let index = i;

      if (index >= images.length) {
        index %= images.length;
      }

      if (index < 0) {
        index = images.length - 1 + ((index + 1) % images.length);
      }

      currentImages.push(images[index]);
    }

    return currentImages;
  }

  scrollRight() {
    const {
      infinite,
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.props;

    const { currentItem: currentIndex } = this.state;

    let safeStep = step;

    if (!infinite) {
      safeStep = (currentIndex + step < images.length - frameSize)
        ? step
        : images.length - frameSize - currentIndex;
    }

    const fps = 60;
    const totalFrames = (animationDuration / 1000) * fps;

    const minX = this.state.currentX - itemWidth * safeStep;

    const timerId = setInterval(() => {
      this.setState(({ currentX }) => (
        {
          currentX: ((currentX > minX)
            ? currentX - (itemWidth * safeStep) / totalFrames
            : minX),
        }
      ));
    }, animationDuration / totalFrames);

    this.setState({ isScrolling: true });

    setTimeout(() => {
      clearInterval(timerId);

      this.setState(({ currentItem }) => {
        let newItem = currentItem + safeStep;

        if (infinite) {
          newItem = (newItem < images.length)
            ? newItem
            : newItem % images.length;
        } else {
          newItem = (newItem < images.length)
            ? newItem
            : images.length - 1;
        }

        return {
          isScrolling: false,
          currentX: 0,
          currentItem: newItem,
        };
      });
    }, animationDuration);
  }

  scrollLeft() {
    const {
      infinite,
      images,
      itemWidth,
      step,
      animationDuration,
    } = this.props;

    const { currentItem: currentIndex } = this.state;

    let safeStep = step;

    if (!infinite) {
      safeStep = (currentIndex - step >= 0)
        ? step
        : currentIndex;
    }

    const fps = 60;
    const totalFrames = (animationDuration / 1000) * fps;

    const maxX = this.state.currentX + itemWidth * safeStep;

    const timerId = setInterval(() => {
      this.setState(({ currentX }) => (
        {
          currentX: ((currentX < maxX)
            ? currentX + (itemWidth * safeStep) / totalFrames
            : maxX),
        }
      ));
    }, animationDuration / totalFrames);

    this.setState({ isScrolling: true });

    setTimeout(() => {
      clearInterval(timerId);

      this.setState(({ currentItem }) => {
        let newItem = currentItem - safeStep;

        if (infinite) {
          newItem = (newItem >= 0)
            ? newItem
            : images.length - 1 + ((newItem + 1) % images.length);
        } else {
          newItem = (newItem >= 0)
            ? newItem
            : 0;
        }

        return {
          isScrolling: false,
          currentX: 0,
          currentItem: newItem,
        };
      });
    }, animationDuration);
  }

  render() {
    const {
      images,
      infinite,
      frameSize,
      itemWidth,
      step,
    } = this.props;

    const { currentItem } = this.state;

    const { isScrolling } = this.state;

    const { currentX } = this.state;

    const frameStyles = {
      width: `${itemWidth * frameSize}px`,
    };

    const defaultOffset = -itemWidth * step;

    const listStyle = {
      transform: `translateX(${defaultOffset + currentX}px)`,
    };

    const itemStyles = {
      width: `${itemWidth}px`,
    };

    const currentImages = this.getCurrentImages();
    const keys = generateKeys(currentImages.length);

    return (
      <div
        className="Carousel"
        style={frameStyles}
      >
        <ul
          className="Carousel__list"
          style={listStyle}
        >
          {
            currentImages.map((src, index) => (
              <li key={keys[index]}>
                <img
                  src={src}
                  alt={String(index)}
                  style={itemStyles}
                />
              </li>
            ))
          }
        </ul>
        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={() => this.scrollLeft()}
            disabled={
              isScrolling
              || (!infinite && currentItem - step < 0)
            }
          >
            Prev
          </button>
          <button
            className="Carousel__button"
            type="button"
            onClick={() => this.scrollRight()}
            disabled={
              isScrolling
              || (!infinite && currentItem + step > images.length - 1)
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
