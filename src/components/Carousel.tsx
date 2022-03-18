import React from 'react';
import classNames from 'classnames';
import { CarouselType } from '../types/CarouselType';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = CarouselType;

export class Carousel extends React.Component<Props, State> {
  state: State = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    scroll: 0,
  };

  prevHandler = () => {
    const { itemWidth, step } = this.state;
    const stepWidth = itemWidth * step;

    this.setState((state) => ({
      scroll: state.scroll + stepWidth < 0 ? state.scroll + stepWidth : 0,
    }));
  };

  nextHandler = () => {
    const { itemWidth, step } = this.state;
    const { images } = this.props;
    const stepWidth = itemWidth * step;
    const stepLimit = -itemWidth * (images.length - step);

    this.setState((state) => ({
      scroll: state.scroll - stepWidth > stepLimit ? state.scroll - stepWidth : stepLimit,
    }));
  };

  chooseStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +e.target.value });
  };

  chooseFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +e.target.value });
  };

  chooseItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +e.target.value });
  };

  chooseAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +e.target.value });
  };

  render() {
    const { images } = this.props;
    const {
      step, itemWidth, frameSize, animationDuration, scroll,
    } = this.state;

    const widthList = itemWidth * frameSize;
    const stepLimit = -itemWidth * (images.length - step);

    return (
      <>
        <div className="container" style={{ width: widthList }}>
          <button
            className={classNames('btn btn-prev', { disabled: !scroll })}
            type="button"
            onClick={this.prevHandler}
          >
            -
          </button>

          <div className="carousel" style={{ width: widthList }}>
            <ul
              className="carousel__list"
              style={{ marginLeft: `${scroll}px`, transition: `margin-left ${animationDuration}ms ease` }}
            >
              {images.map(image => (
                <li key={images.indexOf(image)}>
                  <img
                    className="carousel__list-item"
                    src={image}
                    alt="smiley"
                    style={{ width: itemWidth }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            className={classNames('btn btn-next', { disabled: scroll === stepLimit })}
            type="button"
            onClick={this.nextHandler}
          >
            +
          </button>
        </div>

        <div className="display">
          <label
            htmlFor="inputId"
            className="display__label"
          >
            Step:
            <input
              type="number"
              id="inputId"
              className="display__input"
              min={1}
              max={10}
              value={step}
              onChange={this.chooseStep}
            />
          </label>

          <label
            htmlFor="inputId"
            className="display__label"
          >
            Frame size:
            <input
              type="number"
              id="inputId"
              className="display__input"
              min={1}
              max={10}
              value={frameSize}
              onChange={this.chooseFrameSize}
            />
          </label>

          <label
            htmlFor="inputId"
            className="display__label"
          >
            Item width:
            <input
              type="number"
              id="inputId"
              className="display__input"
              max={400}
              value={itemWidth}
              onChange={this.chooseItemWidth}
            />
          </label>

          <label
            htmlFor="inputId"
            className="display__label"
          >
            Animation Duration:
            <input
              type="number"
              id="inputId"
              className="display__input"
              value={animationDuration}
              onChange={this.chooseAnimationDuration}
            />
          </label>
        </div>
      </>
    );
  }
}
