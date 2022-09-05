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
    gap: 30,
    canMovePrev: false,
    canMoveNext: true,
  };

  handleClickPrev = () => {
    const { translate, gap } = this.state;
    const { step, itemWidth } = this.props;

    const previousStep = translate + step * itemWidth + gap * step;

    if (previousStep > 0) {
      this.setState({
        translate: 0,
        canMovePrev: false,
        canMoveNext: true,
      });
    } else {
      this.setState({
        translate: previousStep,
        canMoveNext: true,
      });
    }
  };

  handleClickNext = () => {
    const { translate, gap } = this.state;
    const { step, itemWidth, frameSize } = this.props;

    const limit = itemWidth * 10 - itemWidth * frameSize + gap * 9
    - gap * (frameSize - 1);

    const nextStep = translate - step * itemWidth - gap * step;

    if (nextStep < -limit) {
      this.setState({
        translate: -limit,
        canMovePrev: true,
        canMoveNext: false,
      });
    } else {
      this.setState({
        translate: nextStep,
        canMovePrev: true,
      });
    }
  };

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
          className="Carousel__btn btn-prev"
          type="button"
          onClick={this.handleClickPrev}
          disabled={!canMovePrev}
        >
          Prev
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
          className="Carousel__btn btn-next"
          type="button"
          data-cy="next"
          onClick={this.handleClickNext}
          disabled={!canMoveNext}
        >
          Next
        </button>
      </div>
    );
  }
}
