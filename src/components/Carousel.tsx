import React from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  overallWidth: number
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  position: number,
  prevDisabled: boolean,
  nextDisabled: boolean,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    overallWidth: 1300,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    position: 0,
    prevDisabled: true,
    nextDisabled: false,
  };

  scrollPrev = () => {
    const {
      overallWidth,
      itemWidth,
      position,
      step,
    } = this.state;

    let newWidth = position - step * itemWidth;

    if (newWidth <= 0) {
      newWidth = 0;

      this.setState({
        position: newWidth,
        prevDisabled: true,
        nextDisabled: false,
      });
    }

    if (newWidth > 0 && newWidth <= overallWidth) {
      this.setState({
        position: newWidth,
        nextDisabled: false,
      });
    }
  };

  scrollNext = () => {
    const {
      overallWidth,
      itemWidth,
      step,
      position,
      frameSize,
    } = this.state;

    let newWidth = position + step * itemWidth;

    if (newWidth >= overallWidth - itemWidth * frameSize) {
      newWidth = overallWidth - itemWidth * frameSize;

      this.setState({
        position: newWidth,
        prevDisabled: false,
        nextDisabled: true,
      });
    }

    if (newWidth > 0 && newWidth < overallWidth - itemWidth * frameSize) {
      this.setState({
        position: newWidth,
        prevDisabled: false,
      });
    }
  };

  setFrameSize = (value: string) => {
    const result = Number(value);

    this.setState({ frameSize: result });
  };

  setItemWidth = (value: string) => {
    const result = Number(value);

    this.setState({
      itemWidth: result,
      overallWidth: result * 10,
      position: 0,
      prevDisabled: true,
      nextDisabled: false,
    });
  };

  setStep = (value: string) => {
    const result = Number(value);

    this.setState({ step: result });
  };

  setAnimationDuration = (value: string) => {
    const result = Number(value);

    this.setState({ animationDuration: result });
  };

  render() {
    const { images } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${this.state.frameSize * this.state.itemWidth}px`,
        }}
      >
        <div
          className="Carousel__container"
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${-this.state.position}px)`,
              transition: `${this.state.animationDuration}ms`,
            }}
          >
            {images.map((image, index) => {
              const id = index + 1;

              return (
                <li className="Carousel__item" key={id}>
                  <img
                    src={image}
                    alt={`${index + 1}`}
                    className="Carousel__image"
                    style={{
                      width: `${this.state.itemWidth}px`,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="button">
          <button
            type="button"
            onClick={this.scrollPrev}
            disabled={this.state.prevDisabled}
            className="button__click"
          >
            Prev
          </button>

          <button
            type="button"
            onClick={this.scrollNext}
            disabled={this.state.nextDisabled}
            className="button__click"
          >
            Next
          </button>
        </div>
        <form className="form">
          <label className="form__label">
            Step
            <input
              type="number"
              min={1}
              max={5}
              value={this.state.step}
              onChange={(event) => {
                this.setStep(event.target.value);
              }}
            />
          </label>
          <label className="form__label">
            Framesize
            <input
              type="number"
              min={1}
              max={10}
              value={this.state.frameSize}
              onChange={(event) => {
                this.setFrameSize(event.target.value);
              }}
            />
          </label>

          <label className="form__label">
            Item width
            <input
              type="range"
              min={130}
              max={200}
              value={this.state.itemWidth}
              onChange={(event) => {
                this.setItemWidth(event.target.value);
              }}
            />
          </label>

          <label className="form__label">
            Animatiom duration
            <input
              type="range"
              min={500}
              max={5000}
              step={500}
              value={this.state.animationDuration}
              onChange={(event) => {
                this.setAnimationDuration(event.target.value);
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}
