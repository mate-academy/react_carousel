import React from 'react';
import './Carousel.scss';
import { Container } from './Container';

type Props = {
  images: string[],
};

type State = {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  translate: number,
  infinite: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    translate: 0,
    infinite: false,
  };

  stepPrev = () => {
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

  stepNext = () => {
    const {
      itemWidth,
      frameSize,
      step,
      translate,
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

  newItemWidth = (value:number) => {
    this.setState({ itemWidth: value });
  };

  newFrameSize = (value:number) => {
    this.setState({ frameSize: value });
  };

  newDuration = (value:number) => {
    this.setState({ animationDuration: value });
  };

  newStep = (value:number) => {
    this.setState({ step: value });
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      animationDuration,
      translate,
      infinite,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          {infinite}
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

          <div className="Carousel__buttons">
            <button
              type="button"
              onClick={this.stepPrev}
            >
              Prev
            </button>

            <button
              data-cy="next"
              type="button"
              onClick={this.stepNext}
            >
              Next
            </button>
          </div>
        </div>

        <Container
          newItemWidth={this.newItemWidth}
          newStep={this.newStep}
          newDuration={this.newDuration}
          newFrameSize={this.newFrameSize}
        />
      </div>
    );
  }
}

export default Carousel;
