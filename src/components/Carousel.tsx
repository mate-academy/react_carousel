import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  curentIndex: number,
};

export class Carousel extends React.Component<Props, State> {
  state: State = {
    curentIndex: 0,
  };

  nextButton = () => {
    const {
      images,
      step,
      frameSize,
      infinite,
    } = this.props;

    const { curentIndex } = this.state;
    const lastIndex = images.length - frameSize;

    this.setState({
      curentIndex: curentIndex + step > lastIndex
        ? lastIndex
        : curentIndex + step,
    });

    if (curentIndex === lastIndex && infinite) {
      this.setState({ curentIndex: 0 });
    }
  };

  prevButton = () => {
    const {
      images,
      step,
      frameSize,
      infinite,
    } = this.props;

    const { curentIndex } = this.state;
    const lastIndex = images.length - frameSize;

    this.setState({
      curentIndex: curentIndex - step > 0
        ? curentIndex - step
        : 0,
    });

    if (curentIndex === 0 && infinite) {
      this.setState({ curentIndex: lastIndex });
    }
  };

  render() {
    const { curentIndex } = this.state;
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const prevDisable = curentIndex === 0 && !infinite;
    const nextDisable = curentIndex === images.length - frameSize && !infinite;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, i) => (
            <li
              className="Carousel__list-item"
              key={image}
              style={{
                transform: `translateX(-${curentIndex * itemWidth}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={`${i} emoji`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={prevDisable}
          onClick={this.prevButton}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={nextDisable}
          onClick={this.nextButton}
          data-cy="next"
        >
          Next
        </button>
      </div>
    );
  }
}
