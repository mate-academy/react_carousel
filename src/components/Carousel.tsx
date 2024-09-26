import React, { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

type State = {
  currentItemWidth: number;
  currentFrameSize: number;
  currentStep: number;
  currentAnimDuration: number;
  transition: number;
  currentImages: string[];
};

class Carousel extends Component<Props, State> {
  state: State = {
    currentItemWidth: this.props.itemWidth,
    currentFrameSize: this.props.frameSize,
    currentStep: this.props.step,
    currentAnimDuration: this.props.animationDuration,
    transition: 0,
    currentImages: this.props.images,
  };

  handlePrevPageClick = () => {
    const { transition, currentStep, currentItemWidth } = this.state;
    const newTransition = transition - currentStep * currentItemWidth;

    this.setState({ transition: Math.max(newTransition, 0) });
  };

  handleNextPageClick = () => {
    const {
      transition,
      currentStep,
      currentItemWidth,
      currentFrameSize,
      currentImages,
    } = this.state;
    const newTransition = transition + currentStep * currentItemWidth;

    this.setState({
      transition: Math.min(
        newTransition,
        currentItemWidth * (currentImages.length - currentFrameSize),
      ),
    });
  };
  // #region characteristicsToChange

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItemWidth = Number(event.target.value);

    this.setState({ currentItemWidth: newItemWidth });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = Number(event?.target.value);

    this.setState({
      currentFrameSize: newFrameSize,
    });
  };

  handleCurrentStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = Number(event.target.value);

    this.setState({ currentStep: newStep });
  };

  handleAnimDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnimDuration = Number(event.target.value);

    this.setState({ currentAnimDuration: newAnimDuration });
  };
  // #endregion

  render() {
    const { images } = this.props;
    const {
      currentItemWidth,
      currentFrameSize,
      currentStep,
      currentAnimDuration,
      transition,
      currentImages,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel-wrapper"
          style={{
            width: `${currentFrameSize * currentItemWidth}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${currentImages.length * currentItemWidth}px`,
              transform: `translateX(-${transition}px)`,
              animationDuration:
                transition === 0 ? 'none' : `${currentAnimDuration}s`,
            }}
          >
            {images.map(image => (
              <li key={image.slice(1)}>
                <img
                  src={`${image}`}
                  alt={image.slice(1)}
                  style={{
                    width: `${currentItemWidth}px`,
                    height: `${currentItemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="
            Carousel__button-wrapper
            Carousel__button-wrapper--prev"
        >
          <button
            className="Carousel__button"
            type="button"
            disabled={transition === 0}
            onClick={this.handlePrevPageClick}
          >
            Prev
          </button>
        </div>

        <div
          className="
            Carousel__button-wrapper
            Carousel__button-wrapper--next"
        >
          <button
            className="Carousel__button"
            type="button"
            onClick={this.handleNextPageClick}
            disabled={
              transition >=
              currentItemWidth * (currentImages.length - currentFrameSize)
            }
            data-cy="next"
          >
            Next
          </button>
        </div>

        <div className="Carousel__inputs">
          <div className="Carousel__data">
            <label htmlFor="itemId">Item Width </label>
            <input
              id="itemId"
              type="number"
              value={currentItemWidth}
              onChange={this.handleItemWidthChange}
            />
          </div>
          <div className="Carousel__data">
            <label htmlFor="frameId">Frame Size </label>
            <input
              id="frameId"
              type="number"
              value={currentFrameSize}
              onChange={this.handleFrameSizeChange}
            />
          </div>
          <div className="Carousel__data">
            <label htmlFor="stepId">Step </label>
            <input
              id="stepId"
              type="number"
              value={currentStep}
              onChange={this.handleCurrentStepChange}
            />
          </div>
          <div className="Carousel__data">
            <label htmlFor="animDurationId">Animation Duration </label>
            <input
              id="animDurationId"
              type="number"
              value={currentAnimDuration}
              onChange={this.handleAnimDurationChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
