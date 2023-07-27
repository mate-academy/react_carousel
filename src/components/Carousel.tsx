import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

type State = {
  translate: number;
  gap: number;
  canMovePrev: boolean;
  canMoveNext: boolean;
};

export class Carousel extends Component<Props, State> {
  state = {
    translate: 0,
    gap: 50,
    canMovePrev: false,
    canMoveNext: true,
  };

  handleClickPrev = () => this.setState((state) => {
    const { translate, gap } = state;
    const { step, itemWidth } = this.props;

    const previousStep = translate + step * itemWidth + gap * step;

    return {
      translate: (previousStep > 0) ? 0 : previousStep,
      canMovePrev: !(previousStep >= 0),
      canMoveNext: true,
    };
  });

  handleClickNext = () => this.setState((state) => {
    const { translate, gap } = state;
    const {
      step,
      itemWidth,
      frameSize,
      images,
    } = this.props;

    const limit = itemWidth * images.length - itemWidth * frameSize + gap * 9
    - gap * (frameSize - 1);

    const nextStep = translate - step * itemWidth - gap * step;

    return {
      translate: (nextStep < -limit) ? -limit : nextStep,
      canMovePrev: true,
      canMoveNext: !(nextStep <= -limit),
    };
  });

  render() {
    const {
      translate,
      gap,
      canMovePrev,
      canMoveNext,
    } = this.state;

    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    return (
      <div className="Carousel">
        <button
          className="Carousel__btn Carousel__btn--prev"
          type="button"
          onClick={this.handleClickPrev}
          disabled={canMovePrev === false}
        >
          &larr;
        </button>

        <ul
          className="Carousel__list"
          style={{
            width: itemWidth * frameSize + gap * (frameSize - 1),
            gap: `${gap}px`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt={image}
                style={{
                  width: itemWidth,
                  transform: `translateX(${translate}px)`,
                  transitionDuration: `${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          className="Carousel__btn Carousel__btn--next"
          type="button"
          data-cy="next"
          onClick={this.handleClickNext}
          disabled={canMoveNext === false}
        >
          &rarr;
        </button>
      </div>
    );
  }
}
