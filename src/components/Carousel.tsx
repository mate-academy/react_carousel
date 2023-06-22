import React from 'react';
import './Carousel.scss';

type State = {
  currPosition: number,
};

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    currPosition: 0,
  };

  maxPosition = this.props.itemWidth
    * (this.props.images.length - this.props.frameSize);

  stepSize = this.props.itemWidth * this.props.step;

  componentDidUpdate() {
    this.maxPosition = (this.props.itemWidth * this.props.images.length)
    - (this.props.itemWidth * this.props.frameSize);

    this.stepSize = this.props.itemWidth * this.props.step;
  }

  nextHandler = () => {
    const { currPosition } = this.state;
    const { itemWidth, infinite } = this.props;

    if (currPosition + this.stepSize < this.maxPosition) {
      this.setState((prevState) => ({
        currPosition: prevState.currPosition + this.stepSize,
      }));
    }

    if (currPosition + this.stepSize >= this.maxPosition
      && currPosition < this.maxPosition) {
      this.setState({ currPosition: this.maxPosition });
    }

    if (currPosition + itemWidth > this.maxPosition
      && currPosition >= this.maxPosition
      && infinite) {
      this.setState({ currPosition: 0 });
    }
  };

  prevHandler = () => {
    const { currPosition } = this.state;
    const { itemWidth, infinite, frameSize } = this.props;

    if (currPosition >= this.stepSize) {
      this.setState((prevState) => ({
        currPosition: prevState.currPosition - this.stepSize,
      }));
    }

    if (currPosition < (itemWidth * frameSize)) {
      this.setState({
        currPosition: 0,
      });
    }

    if (currPosition === 0 && infinite) {
      this.setState({
        currPosition: this.maxPosition,
      });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;
    const { currPosition } = this.state;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currPosition}px)`,
            transition: `transform ${animationDuration}ms`,
            width: `${this.props.itemWidth * this.props.images.length}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={`${index + 1}`}
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
            >
              <img
                src={image}
                alt={`${index + 1}`}
                style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__button-container">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.prevHandler}
          >
            &#10094;
          </button>
          <button
            className="Carousel__button"
            type="button"
            data-cy="next"
            onClick={this.nextHandler}
          >
            &#10095;
          </button>
        </div>

      </div>
    );
  }
}
