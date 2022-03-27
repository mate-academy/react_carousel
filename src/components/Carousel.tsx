import React from 'react';
import './Carousel.scss';
import { Controller } from './Controller';

class Carousel extends React.Component<Props, State> {
  state = {
    itemWidth: 140,
    frameSize: 3,
    duration: 1000,
    translate: 0,
    step: 3,
  };

  prev = () => {
    const {
      translate,
      step,
      itemWidth,
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
    const maxTranslate = -(itemWidth * this.props.images.length - frameSize * itemWidth);

    if (translate - step * itemWidth < maxTranslate) {
      this.setState({ translate: maxTranslate });
    } else {
      this.setState(state => ({
        translate: state.translate - step * itemWidth,
      }));
    }
  };

  changeItemWidth = (value:number) => {
    this.setState({ itemWidth: value });
  };

  changeFrameSize = (value:number) => {
    this.setState({ frameSize: value });
  };

  changeDuration = (value:number) => {
    this.setState({ duration: value });
  };

  changeStep = (value:number) => {
    this.setState({ step: value });
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      duration,
      translate,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${translate}px)`,
              transition: `transform ${duration}ms`,
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
              type="button"
              onClick={this.next}
            >
              next
            </button>
          </div>
        </div>
        <Controller
          changeDuration={this.changeDuration}
          changeFrameSize={this.changeFrameSize}
          changeItemWidth={this.changeItemWidth}
          changeStep={this.changeStep}
        />
      </div>
    );
  }
}

interface Props {
  images: string[],
}

interface State {
  itemWidth: number,
  frameSize: number,
  duration: number,
  translate: number,
  step: number,
}

export default Carousel;
