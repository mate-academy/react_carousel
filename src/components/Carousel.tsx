import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

interface State {
  imageWidth: number,
  frameSize: number,
  step: number,
  animDuration: number,
  infinite: boolean,
  translate: number,
}

export class Carousel extends React.Component<Props, State> {
  state = {
    imageWidth: 130,
    frameSize: 3,
    step: 3,
    animDuration: 1000,
    infinite: false,
    translate: 0,
  };

  handleImageWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imageWidth: +event.target.value,
    });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: +event.target.value,
    });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: +event.target.value,
    });
  };

  handleAnimDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animDuration: +event.target.value,
    });
  };

  handleInfiniteChange = () => {
    this.setState(prevState => ({
      infinite: !prevState.infinite,
    }));
  };

  rightButtonHandler = () => {
    const {
      imageWidth,
      frameSize,
      step,
      infinite,
      translate,
    } = this.state;

    let newTranslate = translate - (imageWidth * step);

    const minTranslate = (imageWidth
      * (frameSize - this.props.images.length));

    if (newTranslate < minTranslate) {
      newTranslate = minTranslate;
    }

    if ((translate === minTranslate) && infinite) {
      newTranslate = 0;
    }

    this.setState({
      translate: newTranslate,
    });
  };

  leftButtonHandler = () => {
    const {
      imageWidth,
      frameSize,
      step,
      infinite,
      translate,
    } = this.state;

    let newTranslate = translate + (imageWidth * step);

    const maxTranslate = 0;
    const minTranslate = (imageWidth
      * (frameSize - this.props.images.length));

    if (newTranslate > maxTranslate) {
      newTranslate = maxTranslate;
    }

    if (translate === maxTranslate && infinite) {
      newTranslate = minTranslate;
    }

    this.setState({
      translate: newTranslate,
    });
  };

  render() {
    const { images } = this.props;
    const {
      imageWidth,
      frameSize,
      step,
      animDuration,
      infinite,
      translate,
    } = this.state;

    const containerWidth = frameSize * imageWidth;
    let isLeftButtonDisabled = false;
    let isRightButtonDisabled = false;

    if (translate === 0 && !infinite) {
      isLeftButtonDisabled = true;
    }

    // translate could be between -1300 and 0
    if (translate === imageWidth * (frameSize - images.length) && !infinite) {
      isRightButtonDisabled = true;
    }

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{ width: `${containerWidth}px` }}
        >
          {images.map(image => (
            <li
              key={image}
              style={{
                transform: `translateX(${translate}px)`,
                transition: `${animDuration}ms`,
              }}

            >
              <img
                src={image}
                style={{ width: `${imageWidth}px` }}
                alt={image[7] === '.'
                  ? `smile_${image[6]}`
                  : `smile_${image[6] + image[7]}`}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__buttons">
          <button
            className="button button--left"
            type="button"
            onClick={this.leftButtonHandler}
            disabled={isLeftButtonDisabled}
          >
            <div className="triangle" />
          </button>
          <button
            className="button button--right"
            type="button"
            onClick={this.rightButtonHandler}
            disabled={isRightButtonDisabled}
            data-cy="next"
          >
            <div className="triangle triangle--right" />
          </button>
        </div>

        <form
          action="/"
          method="post"
          className="Carousel__form"
        >
          <label className="form-field">
            Image width:
            <input
              type="number"
              name="item_width"
              value={imageWidth}
              min="130"
              max="260"
              step="10"
              className="form"
              onChange={this.handleImageWidthChange}
            />
          </label>

          <label className="form-field">
            Frame size:
            <input
              type="number"
              name="frame_size"
              value={frameSize}
              min="1"
              max="10"
              step="1"
              className="form"
              onChange={this.handleFrameSizeChange}
            />
          </label>

          <label className="form-field">
            Step:
            <input
              type="number"
              name="step"
              value={step}
              min="1"
              max="10"
              step="1"
              className="form"
              onChange={this.handleStepChange}
            />
          </label>

          <label className="form-field form-field--anim">
            Animation duration:
            <input
              type="number"
              name="animation_duration"
              value={animDuration}
              min="100"
              max="30000"
              step="100"
              className="form"
              onChange={this.handleAnimDurationChange}
            />
          </label>
          <label className="form-field form-field--infinite">
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              className="form form--infinite"
              onChange={this.handleInfiniteChange}
            />
          </label>
        </form>
      </div>
    );
  }
}
