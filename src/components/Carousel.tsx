import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[]
};

type State = {
  imagesCount: number;
  translateX: number;
  pictureSize: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends React.Component<Props, State> {
  state = {
    imagesCount: this.props.images.length,
    translateX: 0,
    pictureSize: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  moveForward = () => {
    const {
      imagesCount, translateX, pictureSize, frameSize, step,
    } = this.state;

    const lengthLeft = (pictureSize * imagesCount) - translateX;
    const stepsLeft = (lengthLeft / pictureSize) - frameSize;

    this.setState((
      prevState,
    ) => ({
      translateX: step > stepsLeft
        ? prevState.translateX + prevState.pictureSize * stepsLeft
        : prevState.translateX + prevState.pictureSize * step,
    }));
  };

  moveBack = () => {
    const { translateX, step } = this.state;

    if (translateX <= 0) {
      return;
    }

    this.setState((
      prevState,
    ) => ({
      translateX: prevState.pictureSize * step > translateX
        ? 0
        : prevState.translateX - prevState.pictureSize * step,
    }));
  };

  changeFrame = (value: number) => {
    this.setState({ frameSize: value });
  };

  changeTransition = (value: number) => {
    this.setState({ animationDuration: value });
  };

  changeStep = (value: number) => {
    this.setState({ step: value });
  };

  changePicSize = (value: number) => {
    this.setState({ pictureSize: value });
  };

  resetAll = () => {
    this.setState({
      translateX: 0,
      pictureSize: 130,
      frameSize: 3,
      step: 3,
      animationDuration: 1000,
    });
  };

  render() {
    const { pictureSize, frameSize, animationDuration } = this.state;
    const { images } = this.props;
    const transform = {
      transform: `translateX(-${this.state.translateX}px)`,
      transition: `transform ${animationDuration}ms`,
    };

    const imageStyles = {
      height: `${pictureSize}px`,
      width: `${pictureSize}px`,
    };

    Object.assign(transform, imageStyles);

    const wrapperStyles = {
      width: `${frameSize * pictureSize}px`,
      height: `${pictureSize + 20}px`,
    };

    return (
      <div className="carousel">
        <ul className="level">
          <button
            type="button"
            id="button-back"
            className="button is-medium is-success"
            onClick={this.moveBack}
          >
            Prev
          </button>
          <div
            className="carousel__list-wrapper level"
            style={wrapperStyles}
          >
            {images.map((image) => (
              <li
                key={image}
                style={transform}
                className="carousel__image"
              >
                <img src={image} alt="" style={imageStyles} />
              </li>
            ))}
          </div>
          <button
            className="button is-medium is-success"
            type="button"
            id="button-forward"
            onClick={this.moveForward}
          >
            Next
          </button>
        </ul>
        <div className="level inputs-container container">
          <div className="level">
            Size
            <input
              className="input"
              type="number"
              id="size-input"
              value={this.state.pictureSize}
              onChange={
                ({ target }) => this.changePicSize(target.valueAsNumber)
              }
            />
          </div>
          <div className="level">
            Step
            <input
              className="input"
              id="step-input"
              type="number"
              value={this.state.step}
              min={1}
              max={9}
              onChange={({ target }) => this.changeStep(target.valueAsNumber)}
            />
          </div>
          <div className="level">
            Frame
            <input
              className="input"
              id="frame-input"
              type="number"
              value={this.state.frameSize}
              min={1}
              max={9}
              onChange={({ target }) => this.changeFrame(target.valueAsNumber)}
            />
          </div>
          <div className="level">
            Animation duration
            <input
              className="input"
              id="animation-input"
              type="number"
              min={1}
              defaultValue={this.state.animationDuration}
              max={10000}
              onChange={
                ({ target }) => this.changeTransition(target.valueAsNumber)
              }
            />
          </div>
          <div>
            <button
              type="button"
              className="button is-large is-danger"
              onClick={this.resetAll}
            >
              Reset all
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
