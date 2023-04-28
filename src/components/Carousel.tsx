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
  position: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  handleNextClick = (
    step: number,
    itemWidth: number,
    imagesNumber: number,
    frameSize: number,
    position: number,
    infinite: boolean,
  ) => {
    const max = position
      - (step * itemWidth) <= -itemWidth * (imagesNumber - frameSize);

    if (max && infinite) {
      this.setState({ position: 0 });
    } else if (max) {
      this.setState({ position: -itemWidth * (imagesNumber - frameSize) });
    } else {
      this.setState(state => ({
        position: state.position - (step * itemWidth),
      }));
    }
  };

  handlePrevClick = (
    step: number,
    itemWidth: number,
    imagesNumber: number,
    frameSize: number,
    infinite: boolean,
  ) => {
    if (this.state.position + (step * itemWidth) >= 0 && infinite) {
      this.setState({ position: -itemWidth * (imagesNumber - frameSize) });
    } else if (this.state.position + (step * itemWidth) >= 0) {
      this.setState({ position: 0 });
    } else {
      this.setState(state => ({
        position: state.position + (step * itemWidth),
      }));
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const imagesNumber = images.length;

    const imageElements = images.map((image, index) => (
      <li
        style={{
          transition: `transform ${animationDuration}ms`,
          transform: `translateX(${position}px)`,
        }}
      >
        <img src={image} alt={String(index)} width={itemWidth} />
      </li>
    ));

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          {imageElements}
        </ul>

        <button
          type="button"
          data-cy="prev"
          onClick={() => this.handlePrevClick(
            step,
            itemWidth,
            imagesNumber,
            frameSize,
            infinite,
          )}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={() => this.handleNextClick(
            step,
            itemWidth,
            imagesNumber,
            frameSize,
            position,
            infinite,
          )}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
