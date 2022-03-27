import './Carousel.scss';
import { Component } from 'react';
import { CarouselSetting } from './CarouselSetting';

interface Props {
  images: string[];
}

interface State {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  translateValue: number,
}

export class Carousel extends Component<Props, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    translateValue: 0,
  };

  getNextShift = () => (
    this.state.step * this.state.itemWidth
  );

  getAvailableTranslate = () => (
    (this.state.frameSize - this.props.images.length) * this.state.itemWidth
  );

  handlePreviousButtonClick = () => {
    const { translateValue } = this.state;

    if (translateValue < -this.getNextShift()) {
      this.setState(state => ({
        translateValue: state.translateValue + this.getNextShift(),
      }));
    } else {
      this.setState({
        translateValue: 0,
      });
    }
  };

  handleNextButtonClick = () => {
    const { translateValue } = this.state;
    const availableTranslate = this.getAvailableTranslate();
    const spaceRequired = availableTranslate + this.getNextShift();

    if (translateValue >= spaceRequired) {
      this.setState(state => ({
        translateValue: state.translateValue - this.getNextShift(),
      }));
    } else {
      this.setState({
        translateValue: availableTranslate,
      });
    }
  };

  setStep = (value: number) => {
    this.setState({
      translateValue: 0,
      step: value,
    });
  };

  setFrameSize = (value: number) => {
    this.setState({
      translateValue: 0,
      frameSize: value,
    });
  };

  setItemWidth = (value: number) => {
    this.setState({
      translateValue: 0,
      itemWidth: value,
    });
  };

  setAnimationDuration = (value: number) => {
    this.setState({
      translateValue: 0,
      animationDuration: value,
    });
  };

  render() {
    const { images } = this.props;
    const {
      frameSize,
      itemWidth,
      animationDuration,
      translateValue,
    } = this.state;

    return (
      <div
        className="
          Carousel
          d-flex flex-column align-items-center
        "
      >
        <div
          className="Carousel__container"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list d-flex"
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={String(index)}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="
            Carousel__control
            d-flex flex-column align-items-center
          "
        >
          <div className="mb-3">
            <button
              className="Carousel__control-button me-3"
              type="button"
              onClick={this.handlePreviousButtonClick}
              disabled={!this.state.translateValue}
            >
              Previous
            </button>

            <button
              className="Carousel__control-button me-3"
              type="button"
              onClick={this.handleNextButtonClick}
              disabled={this.state.translateValue === this.getAvailableTranslate()}
            >
              Next
            </button>
          </div>

          <div>
            <CarouselSetting
              id="width"
              step={10}
              range={[50, 260]}
              defaultValue={130}
              callback={this.setItemWidth}
            />

            <CarouselSetting
              id="frameSize"
              step={1}
              range={[1, 5]}
              defaultValue={3}
              callback={this.setFrameSize}
            />

            <CarouselSetting
              id="step"
              step={1}
              range={[1, 5]}
              defaultValue={3}
              callback={this.setStep}
            />

            <CarouselSetting
              id="animationDuration"
              step={100}
              range={[100, 3000]}
              defaultValue={1000}
              callback={this.setAnimationDuration}
            />
          </div>
        </div>
      </div>
    );
  }
}
