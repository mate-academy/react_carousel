import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

type State = {
  transform: number,
  isMaxLeft: boolean,
  isMaxRight: boolean,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    transform: 0,
    isMaxRight: false,
    isMaxLeft: !this.props.infinite,
  };

  showPrev = () => {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;

    this.setState(((state: Readonly<State>) => {
      const offset = state.transform + (itemWidth * step);
      let maxOffset = 0;

      if (infinite && offset >= maxOffset) {
        maxOffset = (itemWidth * images.length)
        - (itemWidth * frameSize);

        return {
          transform: -maxOffset,
          isMaxLeft: false,
        };
      }

      if (offset >= maxOffset) {
        return {
          transform: maxOffset,
          isMaxLeft: true,
        };
      }

      return {
        transform: offset,
        isMaxLeft: false,
        isMaxRight: false,
      } as Pick<State, keyof State>;
    }));
  };

  showNext = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    this.setState(((state: Readonly<State>) => {
      const offset = state.transform - (itemWidth * step);
      let maxOffset = (itemWidth * images.length)
        - (itemWidth * frameSize);

      if (infinite && offset <= (-maxOffset)) {
        maxOffset = 0;

        return {
          transform: 0,
          isMaxRight: false,
        } as Pick<State, keyof State>;
      }

      if (offset <= (-maxOffset)) {
        return {
          transform: (-maxOffset),
          isMaxRight: true,
        } as Pick<State, keyof State>;
      }

      return {
        transform: offset,
        isMaxRight: false,
        isMaxLeft: false,
      };
    }));
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const {
      transform,
      isMaxLeft,
      isMaxRight,
    } = this.state;

    const carouselContainerStyle = {
      width: `${frameSize * itemWidth}px`,
    };

    const carouselListStyle = {
      width: `${images.length * itemWidth}px`,
      transform: `translateX(${(transform)}px)`,
      transition: `all ${animationDuration}ms ease`,
    };

    const carouselItemStyle = {
      width: `${itemWidth}px`,
    };

    return (
      <div className="Carousel" style={carouselContainerStyle}>
        <ul className="Carousel__list" style={carouselListStyle}>
          {images.map((image, index) => (
            <li key={image} style={carouselItemStyle}>
              <img src={image} alt={(index + 1).toString()} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.showPrev}
          className="button__prev button"
          disabled={isMaxLeft}
        >
          &#8249;
        </button>
        <button
          type="button"
          onClick={this.showNext}
          data-cy="next"
          disabled={isMaxRight}
          className="button__next button"
        >
          &#8250;
        </button>
      </div>
    );
  }
}
