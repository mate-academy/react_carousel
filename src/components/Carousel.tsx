import React from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  scrollPosition: number,
  slideController: number,
  fullScrollingLength: number,
};

type ScrollDirection = 'prev' | 'next';

class Carousel extends React.Component<Props, State> {
  state = {
    scrollPosition: 0,
    slideController: 0,
    fullScrollingLength: this.props.images.length,
  };

  setScrollPosition = (direction: ScrollDirection) => {
    const { itemWidth, step, images } = this.props;
    const { slideController, fullScrollingLength } = this.state;
    const allSliders = Math.ceil((images.length - step) / step);
    const scrollingLength = fullScrollingLength - step;

    if (direction === 'next' && slideController !== allSliders) {
      this.setState((currentState) => {
        let result;
        let newScrollingLength;

        if (scrollingLength > step) {
          result = currentState.scrollPosition - step * itemWidth;
          newScrollingLength = fullScrollingLength - step;
        } else {
          result = currentState.scrollPosition - scrollingLength * itemWidth;
          newScrollingLength = 0;
        }

        return {
          scrollPosition: result,
          slideController: currentState.slideController + 1,
          fullScrollingLength: newScrollingLength,
        };
      });
    }

    // if (direction === 'prev' && slideController !== 0) {
    //   this.setState((currentState) => {
    //     let result;
    //     let newScrollingLength;

    //     if (scrollingLength > step) {
    //       result = currentState.scrollPosition - step * itemWidth;
    //       newScrollingLength = fullScrollingLength - step;
    //     } else {
    //       result = currentState.scrollPosition - scrollingLength * itemWidth;
    //       newScrollingLength = 0;
    //     }

    //     return {
    //       scrollPosition: result,
    //       slideController: currentState.slideController + 1,
    //       fullScrollingLength: newScrollingLength,
    //     };
    //   });
    // }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { scrollPosition } = this.state;

    return (
      <div className="Carousel">
        <div className="Carousel__container" style={{ width: frameSize * itemWidth }}>
          <ul className="Carousel__list" style={{ transform: `translateX(${scrollPosition}px)`, transitionDuration: `${animationDuration}ms` }}>
            {images.map((image, index) => (
              <li
                key={image}
                className="Carousel__item"
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  className="Carousel__image"
                  style={{ width: itemWidth, height: itemWidth }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons-container">
          <button
            type="button"
            onClick={() => {
              this.setScrollPosition('prev');
            }}
            className={classNames('prev-button')}
          >
            <div className="prev-button__form" />
          </button>
          <button
            type="button"
            onClick={() => {
              this.setScrollPosition('next');
            }}
            className={classNames('next-button')}
          >
            <div className="next-button__form" />
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
