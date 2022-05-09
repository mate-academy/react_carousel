import React from 'react';
import './Carousel.scss';
import { CaruselSettings } from '../../types/CaruselSettings';

type Props = {
  images: string[],
  caruselSettings: CaruselSettings,
};

type State = {
  shiftX: number,
  currentPosition: number,
};

// eslint-disable-next-line react/prefer-stateless-function
export class Carousel extends React.Component<Props, State> {
  state = {
    shiftX: 0,
    currentPosition: 0,
  };

  getSmilesToRender(): Array<string> {
    const {
      frameSize,
      stepCount,
    } = this.props.caruselSettings;

    const { images } = this.props;

    const { currentPosition } = this.state;

    const outerImages: Array<string> = [];

    const start = currentPosition - stepCount;
    const end = currentPosition + stepCount + frameSize;

    for (let i = start; i < end; i += 1) {
      let index = i;

      if (i < 0) {
        index = (i + 1) + (images.length - 1);
      } else {
        index %= images.length;
      }

      outerImages.push(images[index]);
    }

    return outerImages;
  }

  scrollRight = () => {
    const {
      images,
    } = this.props;

    const {
      frameSize,
      stepCount,
      isInfinite,
      animationDuration,
      itemWidth,
    } = this.props.caruselSettings;

    const { currentPosition: currentIndex } = this.state;

    let step = stepCount;

    if (!isInfinite) {
      step = (currentIndex + stepCount < images.length - frameSize)
        ? stepCount
        : images.length - frameSize - currentIndex;
    }

    const frames = 144;
    const animationInSeconds = animationDuration / 1000;
    const totalFrames = animationInSeconds * frames;

    const minShift = this.state.shiftX - itemWidth * step;

    const animationScrollID = setInterval(() => {
      this.setState(({ shiftX }) => (
        {
          shiftX: ((shiftX > minShift)
            ? shiftX - (itemWidth * step) / totalFrames
            : minShift),
        }
      ));
    }, animationDuration / totalFrames);

    setTimeout(() => {
      clearInterval(animationScrollID);

      this.setState(({ currentPosition }) => {
        let newIndex = currentPosition + step;

        if (isInfinite) {
          newIndex = (newIndex < images.length)
            ? newIndex
            : newIndex % images.length;
        } else {
          newIndex = (newIndex < images.length)
            ? newIndex
            : images.length - 1;
        }

        return {
          shiftX: 0,
          currentPosition: newIndex,
        };
      });
    }, animationDuration);
  };

  scrollLeft = () => {
    const {
      images,
    } = this.props;

    const {
      stepCount,
      isInfinite,
      animationDuration,
      itemWidth,
    } = this.props.caruselSettings;

    const { currentPosition: currentIndex } = this.state;

    let step = stepCount;

    if (!isInfinite) {
      step = (currentIndex - stepCount < 0)
        ? currentIndex
        : stepCount;
    }

    const frames = 144;
    const animationInSeconds = animationDuration / 1000;
    const totalFrames = animationInSeconds * frames;

    const minShift = this.state.shiftX + itemWidth * step;

    const animationScrollID = setInterval(() => {
      this.setState(({ shiftX }) => (
        {
          shiftX: ((shiftX < minShift)
            ? shiftX + (itemWidth * step) / totalFrames
            : minShift),
        }
      ));
    }, animationDuration / totalFrames);

    setTimeout(() => {
      clearInterval(animationScrollID);

      this.setState(({ currentPosition }) => {
        let newIndex = currentPosition - step;

        if (isInfinite) {
          newIndex = (newIndex > -1)
            ? newIndex
            : images.length - 1 + ((newIndex + 1) % images.length);
        } else {
          newIndex = (newIndex > -1)
            ? newIndex
            : 0;
        }

        return {
          shiftX: 0,
          currentPosition: newIndex,
        };
      });
    }, animationDuration);
  };

  render() {
    const { shiftX, currentPosition } = this.state;

    const {
      caruselSettings,
      images,
    } = this.props;

    const {
      itemWidth,
      frameSize,
      animationDuration,
      stepCount,
      isInfinite,
    } = caruselSettings;

    const defaultPosition = -itemWidth * stepCount;

    const currentImages = this.getSmilesToRender();

    return (
      <div
        className="carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="carousel__list"
          style={{
            width: `${itemWidth * currentImages.length}px`,
            transition: `translateX ${animationDuration}ms`,
            transform: `translateX(${defaultPosition + shiftX}px)`,
          }}
        >
          {currentImages.map((imageUrl, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="carousel__list-item" key={index}>
              <img
                src={imageUrl}
                alt="SmileImage"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
        <div className="carousel__buttons">
          <button
            type="button"
            onClick={this.scrollLeft}
            disabled={
              (!isInfinite && currentPosition - stepCount < 0)
            }
          >
            previous
          </button>
          <button
            type="button"
            onClick={this.scrollRight}
            disabled={
              (!isInfinite && currentPosition + stepCount > images.length)
            }
          >
            next
          </button>
        </div>
      </div>
    );
  }
}
