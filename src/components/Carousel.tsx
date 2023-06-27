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

  componentDidUpdate() {
    const maxFocusPositionOfAllIcons = this.maxFocusValue();

    if (maxFocusPositionOfAllIcons > this.state.focusPosition) {
      this.setState({
        focusPosition: maxFocusPositionOfAllIcons,
      });
    }
  }

  maxFocusValue = () => {
    const { frameSize, itemWidth, images } = this.props;

    return -((images.length - frameSize) * itemWidth);
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      infinite,
      step,
      animationDuration,
    } = this.props;

    const { focusPosition } = this.state;

    const maxFocusPosition = this.maxFocusValue();
    const minFocusPosition = 0;

    const disablePrevButton = focusPosition >= 0 && !infinite;
    const disableNextButton = focusPosition
    <= maxFocusPosition && !infinite;

    const onPrevHandler = () => {
      if (infinite && focusPosition >= 0) {
        this.setState({
          focusPosition: maxFocusPosition,
        });

        return;
      }

      this.setState(prevState => {
        const newFocusPosition = prevState.focusPosition + (step * itemWidth);

        return {
          focusPosition: newFocusPosition > minFocusPosition
            ? minFocusPosition : newFocusPosition,
        };
      });
    };

    const onNextHandler = () => {
      if (
        infinite
        && focusPosition
        <= maxFocusPosition) {
        this.setState({ focusPosition: 0 });

        return;
      }

      this.setState(prevState => {
        const newValue = prevState.focusPosition - (+step * itemWidth);
        const maxWidth = -((images.length - frameSize) * itemWidth);

        return { focusPosition: newValue < maxWidth ? maxWidth : newValue };
      });
    };

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
                      width: itemWidth,
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
              onClick={onPrevHandler}
            >
              &#8592;
            </button>
            <button
              data-cy="next"
              type="button"
              disabled={disableNextButton}
              onClick={onNextHandler}
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
