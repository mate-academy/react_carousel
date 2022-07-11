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

interface State {
  disabledForward: boolean,
  disabledBack: boolean,
  index: number,
}

class Carousel extends React.Component<Props, State> {
  state = {
    disabledForward: false,
    disabledBack: true,
    index: 0,
  };

  scrollForward = () => {
    const {
      images,
      frameSize,
      step,
      infinite,
    } = this.props;

    const { index } = this.state;

    const lastStep = images.length - frameSize;

    if (index < images.length - step) {
      this.setState((prev) => ({
        index: prev.index + step,
      }));
    }

    if (!infinite && index + step >= lastStep) {
      this.setState({ index: lastStep });
      this.setState({ disabledForward: true });
    }

    if (infinite) {
      if (index + step > lastStep
        && index !== lastStep) {
        this.setState({ index: lastStep });
      }

      if (index === lastStep) {
        this.setState({ index: 0 });
      }
    }

    this.setState({ disabledBack: false });
  };

  scrollBack = () => {
    const {
      images,
      frameSize,
      step,
      infinite,
    } = this.props;

    const { index } = this.state;

    if (index > step) {
      this.setState((prev) => ({
        index: prev.index - step,
      }));
    }

    if (index <= step && index !== 0) {
      this.setState({ index: 0 });

      if (!infinite) {
        this.setState({ disabledBack: true });
      }
    }

    if (infinite && index === 0) {
      this.setState({ index: images.length - frameSize });
    }

    this.setState({ disabledForward: false });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          {images.map((image) => {
            return (
              <li
                key={`${image}`}
                style={{
                  transform: `translateX(-${this.state.index * 100}%)`,
                  transition: `${animationDuration}ms`,
                }}
              >
                <img
                  src={image}
                  alt={`${image}`}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__button-box">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.scrollBack}
            disabled={this.state.disabledBack}
          >
            Prev
          </button>
          <button
            className="Carousel__button"
            type="button"
            onClick={this.scrollForward}
            disabled={this.state.disabledForward}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
