import { Component } from 'react';

import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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

  nextBtnClickHandler = () => {
    const { currentIndex } = this.state;
    const {
      images,
      frameSize,
      infinite,
      step,
      itemWidth,
    } = this.props;

    const maxTransition = images.length * itemWidth - frameSize * itemWidth;

    if (infinite && currentIndex <= -maxTransition) {
      this.setState({
        currentIndex: frameSize * itemWidth,
      });
    }

    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex - step * itemWidth < -maxTransition
          ? -maxTransition
          : prevState.currentIndex - step * itemWidth,
    }));
  };

  prevBtnClickHandler = () => {
    const { currentIndex } = this.state;

    const {
      images,
      itemWidth,
      step,
      infinite,
    } = this.props;

    if (infinite && currentIndex >= 0) {
      this.setState({
        currentIndex: -(images.length * itemWidth),
      });
    }

    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex + step * itemWidth > 0
          ? 0
          : prevState.currentIndex + step * itemWidth,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
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
            {images.map((image) => {
              return (
                <li className="Carousel__img" key={image} style={{ height: `${itemWidth}px` }}>
                  <img src={image} alt={image} style={{ width: `${itemWidth}px` }} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className="Carousel__btn"
            type="button"
            onClick={this.prevBtnClickHandler}
            disabled={!infinite && currentIndex === 0}
          >
            Prev
          </button>
          <button
            className="Carousel__btn"
            type="button"
            onClick={this.nextBtnClickHandler}
            data-cy="next"
            disabled={!infinite && currentIndex === itemWidth
              * (frameSize - images.length)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
