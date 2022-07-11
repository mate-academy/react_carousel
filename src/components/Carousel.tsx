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
  isPrevDisabled: boolean,
  isNextDisabled: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    listShift: 0,
    isPrevDisabled: false,
    isNextDisabled: false,
  };

  componentDidMount() {
    this.buttonsSwitch();
  }

  componentDidUpdate() {
    if (this.props.infinite) {
      if (this.state.isNextDisabled || this.state.isPrevDisabled) {
        this.setState({ isPrevDisabled: false, isNextDisabled: false });
      }

      return;
    }

    this.buttonsSwitch();
  }

  getShiftLimit() {
    return (this.props.images.length - this.props.frameSize)
       * this.props.itemWidth;
  }

  getStepShift() {
    return this.props.step * this.props.itemWidth;
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

    if (this.props.infinite && this.state.listShift === shiftLimit) {
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

    if (this.props.infinite && this.state.listShift === 0) {
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
      transition: `transform ${this.props.animationDuration}ms`,
      transform: `translateX(-${this.state.listShift}px)`,
    };

    const imgStyles: React.CSSProperties = {
      width: `${this.props.itemWidth}px`,
    };

    const wrapperStyles: React.CSSProperties = {
      width: `${this.props.frameSize * this.props.itemWidth}px`,
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
