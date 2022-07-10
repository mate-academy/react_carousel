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
  listShift: number,

  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,

  isPrevDisabled: boolean,
  isNextDisabled: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    listShift: 0,

    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,

    isPrevDisabled: false,
    isNextDisabled: false,
  };

  componentDidMount() {
    this.buttonsSwitch();
  }

  componentDidUpdate() {
    this.propsToStateUpdate();

    if (this.state.infinite) {
      if (this.state.isNextDisabled || this.state.isPrevDisabled) {
        this.setState({ isPrevDisabled: false, isNextDisabled: false });
      }

      return;
    }

    this.buttonsSwitch();
  }

  getShiftLimit() {
    return (this.props.images.length - this.state.frameSize)
       * this.state.itemWidth;
  }

  getStepShift() {
    return this.state.step * this.state.itemWidth;
  }

  propsToStateUpdate() {
    if (this.state.step !== this.props.step) {
      this.setState({ step: this.props.step });

      return;
    }

    if (this.state.frameSize !== this.props.frameSize) {
      this.setState({ frameSize: this.props.frameSize });

      return;
    }

    if (this.state.itemWidth !== this.props.itemWidth) {
      this.setState({ itemWidth: this.props.itemWidth });

      return;
    }

    if (this.state.animationDuration !== this.props.animationDuration) {
      this.setState({ animationDuration: this.props.animationDuration });

      return;
    }

    if (this.state.infinite !== this.props.infinite) {
      this.setState({ infinite: this.props.infinite });
    }
  }

  nextBtnHandler() {
    const shiftLimit = this.getShiftLimit();

    if (this.state.listShift < shiftLimit) {
      let stepShift = this.getStepShift();

      if ((this.state.listShift + stepShift) > shiftLimit) {
        stepShift = shiftLimit - this.state.listShift;
      }

      this.setState(prev => ({
        listShift: prev.listShift + stepShift,
      }));

      return;
    }

    if (this.state.infinite && this.state.listShift === shiftLimit) {
      this.setState({ listShift: 0 });
    }
  }

  prevBtnHandler() {
    if (this.state.listShift > 0) {
      let stepShift = this.getStepShift();

      if ((this.state.listShift - stepShift) < 0) {
        stepShift = this.state.listShift;
      }

      this.setState(prev => ({
        listShift: prev.listShift - stepShift,
      }));

      return;
    }

    if (this.state.infinite && this.state.listShift === 0) {
      this.setState({ listShift: this.getShiftLimit() });
    }
  }

  buttonsSwitch() {
    if (this.state.isPrevDisabled && this.state.listShift > 0) {
      this.setState({ isPrevDisabled: false });

      return;
    }

    if (this.state.listShift <= 0 && !this.state.isPrevDisabled) {
      this.setState({ isPrevDisabled: true });

      return;
    }

    const shiftLimit = this.getShiftLimit();

    if (this.state.listShift >= shiftLimit && !this.state.isNextDisabled) {
      this.setState({ isNextDisabled: true });

      return;
    }

    if (this.state.isNextDisabled && this.state.listShift < shiftLimit) {
      this.setState({ isNextDisabled: false });
    }
  }

  render(): React.ReactNode {
    const listStyles: React.CSSProperties = {
      transition: `transform ${this.state.animationDuration}ms`,
      transform: `translateX(-${this.state.listShift}px)`,
    };

    const imgStyles: React.CSSProperties = {
      width: `${this.state.itemWidth}px`,
    };

    const wrapperStyles: React.CSSProperties = {
      width: `${this.state.frameSize * this.state.itemWidth}px`,
    };

    return (
      <div className="Carousel">
        <button
          type="button"
          className="Carousel__button"
          onClick={() => (this.prevBtnHandler())}
          disabled={this.state.isPrevDisabled}
        >
          ⬅️
        </button>

        <div
          className="Carousel__wrapper"
          style={wrapperStyles}
        >
          <ul
            className="Carousel__list"
            style={listStyles}
          >
            {this.props.images.map((imgSrc, index) => (
              <li key={imgSrc}>
                <img
                  src={imgSrc}
                  alt={String(index)}
                  style={imgStyles}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="Carousel__button"
          onClick={() => (this.nextBtnHandler())}
          disabled={this.state.isNextDisabled}
          data-cy="next"
        >
          ➡️
        </button>
      </div>
    );
  }
}

export default Carousel;
