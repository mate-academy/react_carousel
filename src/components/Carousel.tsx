import React from 'react';
import './Carousel.scss';
import { Input } from './Input';

type Props = {
  images: string[],
  // infinite: boolean,
};

type State = {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  translate: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    translate: 0,
  };

  prev = () => {
    const {
      step,
      itemWidth,
      translate,
    } = this.state;

    if (translate + step * itemWidth > 0) {
      this.setState({ translate: 0 });
    } else {
      this.setState(state => ({
        translate: state.translate + step * itemWidth,
      }));
    }
  };

  next = () => {
    const {
      translate,
      step,
      itemWidth,
      frameSize,
    } = this.state;

    const maxTranslate = -(
      itemWidth * this.props.images.length - frameSize * itemWidth);

    if (translate - step * itemWidth < maxTranslate) {
      this.setState({ translate: maxTranslate });
    } else {
      this.setState(state => ({
        translate: state.translate - step * itemWidth,
      }));
    }
  };

  widthChanger = (value: number) => {
    this.setState({ itemWidth: value });
  };

  stepChanger = (value: number) => {
    this.setState({ step: value });
  };

  AnimationDurationChanger = (value: number) => {
    this.setState({ animationDuration: value });
  };

  FrameSizeChanger = (value: number) => {
    this.setState({ frameSize: value });
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      translate,
      animationDuration,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${translate}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li
                key={image}
              >
                <img
                  src={image}
                  alt={`${index}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>

          <div
            className="Carousel__buttons"
          >
            <button
              type="button"
              onClick={this.prev}
            >
              prev
            </button>
            <button
              data-cy="next"
              type="button"
              onClick={this.next}
            >
              next
            </button>
          </div>
        </div>
        <Input
          name="width"
          defaultValue={130}
          min={50}
          max={250}
          step={10}
          onChange={this.widthChanger}
        />

        <Input
          name="step"
          defaultValue={3}
          min={1}
          max={10}
          step={1}
          onChange={this.stepChanger}
        />

        <Input
          name="duration"
          defaultValue={1000}
          min={100}
          max={3000}
          step={100}
          onChange={this.AnimationDurationChanger}
        />

        <Input
          name="frame-size"
          defaultValue={3}
          min={1}
          max={10}
          step={1}
          onChange={this.FrameSizeChanger}
        />
      </div>
    );
  }
}

export default Carousel;
