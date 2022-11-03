import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  frameSize: number,
  step: number,
  isInfinite: boolean,
  itemWidth: number,
  animationDuration: number,
}

interface State {
  isNextBtnDisabled: boolean,
  isPrevBtnDisabled: boolean,
  index: number,
}

class Carousel extends React.Component<Props, State> {
  state = {
    isNextBtnDisabled: false,
    isPrevBtnDisabled: true,
    index: 0,
  };

  scrollForward = () => {
    const {
      images,
      frameSize,
      step,
      isInfinite,
    } = this.props;

    const { index } = this.state;

    const lastStep = images.length - frameSize;

    if (index < images.length - step) {
      this.setState((prev) => ({
        index: prev.index + step,
      }));
    }

    if (!isInfinite && index + step >= lastStep) {
      this.setState({ index: lastStep });
      this.setState({ isNextBtnDisabled: true });
    }

    if (isInfinite) {
      if (index + step > lastStep
        && index !== lastStep) {
        this.setState({ index: lastStep });
      }

      if (index === lastStep) {
        this.setState({ index: 0 });
      }
    }

    this.setState({ isPrevBtnDisabled: false });
  };

  scrollBack = () => {
    const {
      images,
      frameSize,
      step,
      isInfinite,
    } = this.props;

    const { index } = this.state;

    if (index > step) {
      this.setState((prev) => ({
        index: prev.index - step,
      }));
    }

    if (index <= step && index !== 0) {
      this.setState({ index: 0 });

      if (!isInfinite) {
        this.setState({ isPrevBtnDisabled: true });
      }
    }

    if (isInfinite && index === 0) {
      this.setState({ index: images.length - frameSize });
    }

    this.setState({ isNextBtnDisabled: false });
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
                key={image}
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
            disabled={this.state.isPrevBtnDisabled}
          >
            Prev
          </button>
          <button
            className="Carousel__button"
            type="button"
            onClick={this.scrollForward}
            disabled={this.state.isNextBtnDisabled}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
