import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

type State = {
  translate: number;
  gap: number;
  isLimitNext: boolean;
  isLimitPrev: boolean;
};

class Carousel extends React.Component<Props, State> {
  state = {
    translate: 0,
    gap: 50,
    isLimitPrev: true,
    isLimitNext: false,
  };

  handleClickNext = () => {
    const { translate, gap } = this.state;
    const { step, itemWidth, frameSize } = this.props;

    const maxLimit = itemWidth * 10 - itemWidth * frameSize
      + gap * 9 - gap * (frameSize - 1);

    const nextStep = translate - step * itemWidth - gap * step;

    if (nextStep < -maxLimit) {
      this.setState({
        translate: -maxLimit,
        isLimitNext: true,
        isLimitPrev: false,
      });

      return;
    }

    this.setState({
      translate: nextStep,
      isLimitPrev: false,
    });
  };

  handleClickPrev = () => {
    const { translate, gap } = this.state;
    const { step, itemWidth } = this.props;

    const prevStep = translate + step * itemWidth + gap * step;

    if (prevStep > 0) {
      this.setState({
        translate: 0,
        isLimitPrev: true,
        isLimitNext: false,
      });

      return;
    }

    this.setState({
      translate: prevStep,
      isLimitNext: false,
    });
  };

  render() {
    const {
      translate,
      gap,
      isLimitNext,
      isLimitPrev,
    } = this.state;
    const {
      animationDuration,
      itemWidth,
      frameSize,
    } = this.props;

    return (
      <div className="Carousel">
        <button
          type="button"
          onClick={this.handleClickPrev}
          aria-label="Prev"
          className="button-up"
          disabled={isLimitPrev === true}
        />

        <ul
          className="Carousel__list"
          style={{
            width: itemWidth * frameSize + gap * (frameSize - 1),
            gap: `${gap}px`,
          }}
        >
          {this.props.images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt={image}
                style={{
                  transform: `translateX(${translate}px)`,
                  transitionDuration: `${animationDuration}ms`,
                  width: itemWidth,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.handleClickNext}
          aria-label="Next"
          data-cy="next"
          className="button-down"
          disabled={isLimitNext === true}
        />
      </div>
    );
  }
}

export default Carousel;
