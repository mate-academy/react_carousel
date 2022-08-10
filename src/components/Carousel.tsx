import React from 'react';
import './Carousel.scss';
import { CarouselType } from '../types/CarouselType';

type State = {
  leftSide: number,
  stopPrevButton: boolean,
  stopNextButton: boolean,
};

let newImages: string[] = [];

export class Carousel extends React.Component<CarouselType, State> {
  state = {
    leftSide: 0,
    stopPrevButton: true,
    stopNextButton: false,
  };

  handleNextButton = () => {
    const {
      step, itemWidth, infinite, frameSize,
    } = this.props;
    const { leftSide } = this.state;
    const shift = itemWidth * step;
    const carouselWidth = itemWidth * newImages.length;

    this.setState((prevState) => (
      { leftSide: prevState.leftSide - shift }));

    if (leftSide - shift < 0) {
      this.setState({ stopPrevButton: false });
    }

    if (infinite) {
      this.setState({ stopNextButton: false });
      newImages = [...newImages, ...this.props.images];
    }

    if (!infinite
      && ((leftSide - shift - frameSize * itemWidth) <= -carouselWidth)) {
      this.setState({ stopNextButton: true });
      this.setState({ leftSide: frameSize * itemWidth - carouselWidth });
    }
  };

  handlePrevButton = () => {
    const { step, itemWidth } = this.props;
    const { leftSide } = this.state;
    const shift = itemWidth * step;
    const carouselWidth = itemWidth * newImages.length;

    if (leftSide + shift * 2 > -carouselWidth) {
      this.setState({ stopNextButton: false });
    }

    if ((leftSide + shift) >= 0) {
      this.setState({ stopPrevButton: true });
      this.setState({ leftSide: 0 });
    }

    if ((leftSide + shift) < 0) {
      this.setState((prevState) => (
        { leftSide: prevState.leftSide + shift }));
    }
  };

  checkPosition = () => {
    if (this.state.leftSide < -this.props.itemWidth * newImages.length) {
      this.setState({ leftSide: 0 });
      this.setState({ stopPrevButton: true });
      this.setState({ stopNextButton: false });
    }
  };

  render() {
    const {
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const {
      leftSide,
      stopPrevButton,
      stopNextButton,
    } = this.state;

    if (!infinite) {
      newImages = [...this.props.images];
      this.checkPosition();
    }

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{
            width: itemWidth * frameSize,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              left: leftSide,
              transition: `left ${animationDuration}ms`,
            }}
          >
            {newImages.map((image, index) => (
              <li>
                <img
                  key={+new Date() + image}
                  src={`./img/${(index % 10) + 1}.png`}
                  alt={`${index + 1}`}
                  style={{
                    width: itemWidth,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="Carousel__button-group">
          <button
            type="button"
            className="Carousel__button"
            disabled={stopPrevButton}
            onClick={this.handlePrevButton}
          >
            ◀◀
          </button>
          <button
            type="button"
            data-cy="next"
            className="Carousel__button"
            disabled={infinite ? !infinite : stopNextButton}
            onClick={this.handleNextButton}
          >
            ▶▶
          </button>
        </div>
      </div>
    );
  }
}
