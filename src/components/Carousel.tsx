import React from 'react';
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
  offset: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    offset: 0,
  };

  handleNext = () => {
    if (this.props.images.length <= this.props.frameSize) {
      return;
    }

    let newOffset = this.props.step + this.state.offset;
    const maxOffset = this.props.images.length - this.props.frameSize;

    if (!this.props.infinite) {
      newOffset = Math.min(newOffset, maxOffset);
      newOffset = Math.max(0, newOffset);
    } else {
      newOffset = newOffset > maxOffset ? 0 : newOffset;
    }

    this.setState({ offset: newOffset });
  };

  handlePrev = () => {
    if (this.props.images.length <= this.props.frameSize) {
      return;
    }

    let newOffset = this.state.offset - this.props.step;

    if (!this.props.infinite) {
      newOffset = Math.max(0, newOffset);
    } else {
      const maxOffset = this.props.images.length - this.props.frameSize;

      newOffset = newOffset < 0 ? maxOffset : newOffset;
    }

    this.setState({ offset: newOffset });
  };

  render() {
    const { images, itemWidth, frameSize, animationDuration, infinite } =
      this.props;
    const { offset } = this.state;
    const frameWidth = itemWidth * frameSize;
    const listWidth = itemWidth * images.length;
    const offsetTransform = offset * itemWidth;
    const isPrevDisabled = offset === 0 && !infinite;
    const maxOffset = images.length - frameSize;
    const isNextDisabled = offset >= maxOffset && !infinite;

    return (
      <div className="Carousel">
        <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
          <ul
            className="Carousel__list"
            style={{
              width: `${listWidth}px`,
              transform: `translateX(-${offsetTransform}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
            }}
          >
            {this.props.images.map((image, index) => (
              <li
                key={image}
                className="Carousel__list-element"
                style={{ width: `${itemWidth}px` }}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={itemWidth.toString()}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          data-cy="prev"
          onClick={this.handlePrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={this.handleNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    );
  }
}
