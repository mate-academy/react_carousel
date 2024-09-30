import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  currentIndex: number;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currentIndex: 0,
  };

  nextButtonClickHandler = () => {
    const { currentIndex } = this.state;
    const { images, frameSize, infinite, step, itemWidth } = this.props;
    const maxTransition = images.length * itemWidth - frameSize * itemWidth;

    if (infinite && currentIndex <= -maxTransition) {
      this.setState({
        currentIndex: frameSize * itemWidth,
      });
    }

    this.setState(prevState => ({
      currentIndex:
        prevState.currentIndex - step * itemWidth < -maxTransition
          ? -maxTransition
          : prevState.currentIndex - step * itemWidth,
    }));
  };

  prevButtonClickHandler = () => {
    const { currentIndex } = this.state;
    const { images, itemWidth, step, infinite } = this.props;

    if (infinite && currentIndex >= 0) {
      this.setState({
        currentIndex: -(images.length * itemWidth),
      });
    }

    this.setState(prevState => ({
      currentIndex:
        prevState.currentIndex + step * itemWidth > 0
          ? 0
          : prevState.currentIndex + step * itemWidth,
    }));
  };

  render() {
    const { images, frameSize, itemWidth, animationDuration, infinite }
    = this.props;
    const { currentIndex } = this.state;
    const nextDisabled = !infinite && currentIndex === itemWidth
    * (frameSize - images.length);
    const prevDisabled = !infinite && currentIndex === 0;

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{
            width: `${itemWidth * frameSize}px`,
            height: `${itemWidth}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translate(${currentIndex}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map(image => {
              return (
                <li
                  className="Carousel__img"
                  key={image}
                  style={{ height: '100%' }}
                >
                  <img
                    src={image}
                    alt={image}
                    style={{ width: `${itemWidth}px` }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="Buttons">
          <button
            type="button"
            className="Button"
            onClick={this.prevButtonClickHandler}
            disabled={prevDisabled}
          >
            Prev
          </button>

          <button
            type="button"
            data-cy="next"
            className="Button"
            onClick={this.nextButtonClickHandler}
            disabled={nextDisabled}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
