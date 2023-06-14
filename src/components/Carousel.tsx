import React from 'react';
import './Carousel.scss';
import { Input } from './FormFields';

type Props = {
  images: string[],
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

  stepPrev = () => {
    const { step, itemWidth, translate } = this.state;

    if (translate + step * itemWidth < 0) {
      this.setState(prevState => ({
        translate: prevState.translate + step * itemWidth,
      }));
    } else {
      this.setState({ translate: 0 });
    }
  };

  stepNext = () => {
    const {
      step, itemWidth, translate, frameSize,
    } = this.state;

    const hiddenScroll = -(
      itemWidth * this.props.images.length - frameSize * itemWidth);

    if (translate - step * itemWidth < hiddenScroll) {
      this.setState({ translate: hiddenScroll });
    } else {
      this.setState((prevState) => ({
        translate: prevState.translate - step * itemWidth,
      }));
    }
  };

  widthChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  stepChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  AnimationDurationChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  FrameSizeChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
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
          className="Carousel__container"
          style={{ width: `${itemWidth * frameSize}px` }}
        >

          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${translate}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, i) => (
              <li
                key={image}
              >
                <img
                  src={image}
                  alt={`${i}`}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>

          <div
            className="Carousel__buttons"
          >
            <button
              type="button"
              onClick={this.stepPrev}
            >
              &larr;
            </button>
            <button
              data-cy="next"
              type="button"
              onClick={this.stepNext}
            >
              &rarr;
            </button>
          </div>
        </div>
        <div className="Inputs">
          <Input
            className="Inputs__input"
            name="ItemWidth"
            defaultValue={130}
            min={50}
            max={140}
            step={10}
            onChange={this.widthChanger}
          />

          <Input
            className="Inputs__input"
            name="Step"
            defaultValue={3}
            min={1}
            max={10}
            step={1}
            onChange={this.widthChanger}
          />

          <Input
            className="Inputs__input"
            name="Duration"
            defaultValue={1000}
            min={100}
            max={3000}
            step={100}
            onChange={this.AnimationDurationChanger}
          />

          <Input
            className="Inputs__input"
            name="Frame-size"
            defaultValue={3}
            min={1}
            max={10}
            step={1}
            onChange={this.FrameSizeChanger}
          />
        </div>
      </div>
    );
  }
}

export default Carousel;
