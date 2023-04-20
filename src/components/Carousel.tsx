import React from 'react';
import './Carousel.scss';

type State = {
  currentPosition: number,
};

type Props = {
  images: string[],
  emojiWidth: number,
  frameSize: number,
  step: number,
  animationDur: number;
  infinite: boolean,
};

export class Carousel extends React.Component<Props, State> {
  state: State = {
    currentPosition: 0,
  };

  maxPosition = (this.props.emojiWidth * this.props.images.length)
  - (this.props.emojiWidth * this.props.frameSize);

  stepSize = this.props.emojiWidth * this.props.step;

  componentDidUpdate(): void {
    this.maxPosition = (this.props.emojiWidth * this.props.images.length)
    - (this.props.emojiWidth * this.props.frameSize);

    this.stepSize = this.props.emojiWidth * this.props.step;
  }

  handleMoveRight = () => {
    if (this.state.currentPosition + this.stepSize < this.maxPosition) {
      this.setState((prevState: State) => ({
        currentPosition: prevState.currentPosition + this.stepSize,
      }));
    }

    if (this.state.currentPosition + this.stepSize
        >= this.maxPosition
        && this.state.currentPosition < this.maxPosition) {
      this.setState({
        currentPosition: this.maxPosition,
      });
    }

    if (this.state.currentPosition + this.props.emojiWidth > this.maxPosition
        && this.state.currentPosition >= this.maxPosition
        && this.props.infinite) {
      this.setState({
        currentPosition: 0,
      });
    }
  };

  handleMoveLeft = () => {
    if (this.state.currentPosition >= this.stepSize) {
      this.setState((prevState: State) => ({
        currentPosition: prevState.currentPosition
          - this.stepSize,
      }));
    }

    if (this.state.currentPosition < 390) {
      this.setState({
        currentPosition: 0,
      });
    }

    if (this.state.currentPosition === 0 && this.props.infinite) {
      this.setState({
        currentPosition: this.maxPosition,
      });
    }
  };

  render() {
    return (
      <>
        <div
          className="Carousel"
          style={{
            width: `${this.props.emojiWidth * this.props.frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${this.state.currentPosition}px)`,
              transition: `transform ${this.props.animationDur}ms`,
              width: `${this.props.emojiWidth * this.props.images.length}px`,
            }}
          >
            {this.props.images.map((image: string, index: number) => (
              <li key={`${index + 1}`}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  style={{
                    width: `${this.props.emojiWidth}px`,
                    height: `${this.props.emojiWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>

          <div className="buttonsContainer">
            <button type="button" onClick={this.handleMoveLeft}>Prev</button>
            <button
              type="button"
              onClick={this.handleMoveRight}
              data-cy="next"
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Carousel;
