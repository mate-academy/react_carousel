import React from 'react';

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
  position: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  maxPosition = this.props.images.length - this.props.frameSize;

  prev = () => () => {
    const prevPosition = this.state.position - this.props.step;

    if (this.props.infinite && this.state.position === 0) {
      this.setState({ position: this.maxPosition });

      return;
    }

    if (prevPosition < 0) {
      this.setState({ position: 0 });
    } else {
      this.setState((prevState) => ({
        position: prevState.position - this.props.step,
      }));
    }
  };

  next = () => () => {
    const nextPosition = this.state.position + this.props.step;

    if (this.props.infinite && this.state.position === this.maxPosition) {
      this.setState({ position: 0 });

      return;
    }

    if (nextPosition > this.maxPosition) {
      this.setState({ position: this.maxPosition });
    } else {
      this.setState((prevState) => ({
        position: prevState.position + this.props.step,
      }));
    }
  };

  render() {
    const sliderWidth = this.props.frameSize * this.props.itemWidth;

    const sliderScroll = {
      transform: `translateX(-${this.state.position * this.props.itemWidth}px)`,
      transitionDuration: `${this.props.animationDuration}ms`,
    };

    return (
      <div className="сarousel" style={{ width: sliderWidth }}>
        <ul style={sliderScroll} className="сarousel__list">
          {this.props.images.map((url) => (
            <li className="сarousel__item" key={url}>
              <img
                style={{ width: this.props.itemWidth }}
                src={url}
                alt="smile"
              />
            </li>
          ))}
        </ul>
        <div className="arrow-container">
          <button
            className="arrow arrow-prev"
            type="button"
            onClick={this.prev()}
          >
            Prev
          </button>
          <button
            className="arrow arrow-next"
            type="button"
            onClick={this.next()}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
