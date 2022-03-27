import './Carousel.scss';
import { Component } from 'react';
import { CarouselSetting } from '../CarouselSetting/CarouselSetting';

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

  getNextShift = (): number => (
    this.state.step * this.state.itemWidth
  );

  getAvailableTranslate = () => (
    (this.state.frameSize - this.props.images.length) * this.state.itemWidth
  );

  handlePreviousButtonClick = () => {
    if (this.state.translateValue <= -this.getNextShift()) {
      this.setState(state => ({
        translateValue: state.translateValue + this.getNextShift(),
      }));
    }
  };

  handleNextButtonClick = () => {
    const spaceRequired
      = this.getAvailableTranslate() + this.getNextShift();

    if (this.state.translateValue >= spaceRequired) {
      this.setState(state => ({
        translateValue: state.translateValue - this.getNextShift(),
      }));
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
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li
                className="Carousel__list-item"
                key={image}
              >
                <img
                  className="Carousel__list-image"
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

        <div className="Carousel__controlPanel">
          <button
            type="button"
            onClick={this.handlePreviousButtonClick}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={this.handleNextButtonClick}
          >
            Next
          </button>

          <CarouselSetting
            id="width"
            step={10}
            range={[0, 260]}
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
            range={[1, 3000]}
            defaultValue={1000}
            callback={this.setAnimationDuration}
          />
        </div>
      </div>
    );
  }
}
