import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
}

interface State {
  scrolledWidth: number,
  maxWidth: number,
}

class Carousel extends React.Component<Props, State> {
  state = {
    scrolledWidth: 0,
    maxWidth: 1300,
  };

  scrollLeft = (step:number) => {
    this.setState((prevState) => {
      return {
        scrolledWidth: prevState.scrolledWidth - step,
      };
    });
  };

  scrollRight = (step:number) => {
    this.setState((prevState) => {
      return {
        scrolledWidth: prevState.scrolledWidth + step,
      };
    });
  };

  render() {
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.props;
    const { scrolledWidth, maxWidth } = this.state;
    const containerWidth = itemWidth * frameSize;
    const pixelsToScroll = step * itemWidth;
    const isPrevButtonDisabled = Math.abs(scrolledWidth) - pixelsToScroll < 0;
    const isNextButtonDisabled = step < 3
      ? Math.abs(scrolledWidth - pixelsToScroll) > maxWidth - pixelsToScroll
      : Math.abs(scrolledWidth - pixelsToScroll) > maxWidth;

    return (
      <div className="Carousel">
        <div
          style={{ maxWidth: `${containerWidth}px` }}
          className="container"
        >
          <ul
            style={{
              transform: `translateX(${scrolledWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
            className="Carousel__list"
          >
            {
              this.props.images.map((image:string) => (
                <li key={image}>
                  <img
                    style={{ width: `${itemWidth}` }}
                    src={image}
                    alt="smile"
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <div className="wrapp">
          <div className="Carousel__buttons--container">
            <button
              disabled={isPrevButtonDisabled}
              onClick={() => this.scrollRight(pixelsToScroll)}
              className="button Carousel__buttons--container--button"
              type="button"
            >
              Prev
            </button>

            <button
              disabled={isNextButtonDisabled}
              onClick={() => this.scrollLeft(pixelsToScroll)}
              className="button Carousel__buttons--container--button"
              type="button"
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
