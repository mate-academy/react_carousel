import React from 'react';
import './Carousel.scss';
import { CarouselValues } from '../types/carousel';

type State = {
  focusPosition: number;
};

class Carousel extends React.Component<CarouselValues, State> {
  state = {
    focusPosition: 0,
  };

  maxFocusPositionOfAllIcons = () => {
    const {
      itemWidth,
      frameSize,
    } = this.props;

    return -((this.props.images.length - frameSize) * itemWidth);
  };

  onPrevHandler = () => {
    const {
      step,
      itemWidth,
      infinite,
    } = this.props;

    const { focusPosition } = this.state;

    if (infinite && focusPosition >= 0) {
      this.setState({
        focusPosition: this.maxFocusPositionOfAllIcons(),
      });

      return;
    }

    this.setState(prevState => {
      return { focusPosition: prevState.focusPosition + (+step * itemWidth) };
    });
  };

  onNextHandler = () => {
    const {
      step,
      itemWidth,
      infinite,
    } = this.props;

    const { focusPosition } = this.state;

    if (
      infinite
      && focusPosition
      <= this.maxFocusPositionOfAllIcons()) {
      this.setState({ focusPosition: 0 });

      return;
    }

    this.setState(prevState => {
      return { focusPosition: prevState.focusPosition - (+step * itemWidth) };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      infinite,
      animationDuration,
    } = this.props;
    const { focusPosition } = this.state;

    const disablePrevButton = focusPosition >= 0 && !infinite;
    const disableNextButton = focusPosition
    <= this.maxFocusPositionOfAllIcons() && !infinite;

    return (
      <div className="Carousel">
        <div>
          <ul
            style={{ width: frameSize * itemWidth }}
            className="Carousel__list"
          >
            {images.map((imgLink: string) => {
              return (
                <li
                  className="Carousel__item"
                  key={imgLink}
                >
                  <img
                    style={{
                      width: +itemWidth,
                      transform: `translateX(${focusPosition}px)`,
                      transition: `${animationDuration}ms`,
                    }}
                    src={imgLink}
                    alt={imgLink}
                  />
                </li>
              );
            })}
          </ul>

          <div className="Carousel__buttons">
            <button
              type="button"
              disabled={disablePrevButton}
              onClick={this.onPrevHandler}
            >
              &#8592;
            </button>
            <button
              data-cy="next"
              type="button"
              disabled={disableNextButton}
              onClick={this.onNextHandler}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
