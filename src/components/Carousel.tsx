import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  disableButtonR: boolean;
  disableButtonL: boolean;
  oneStep: number;
  lastStep: boolean;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    disableButtonR: false,
    disableButtonL: true,
    oneStep: 0,
    lastStep: false,
  };

  scrollRight = () => {
    const {
      itemWidth,
      step,
      infinite,
      images,
      frameSize,
    } = this.props;
    const { disableButtonR, oneStep } = this.state;
    let { lastStep } = this.state;
    const maxSteps = images.length - frameSize;

    if (disableButtonR && infinite === false) {
      return;
    }

    let newStep = oneStep - itemWidth * step;

    newStep = Math.max(newStep, -itemWidth * maxSteps);

    if (disableButtonR && infinite) {
      lastStep = true;
      newStep = 0;
    }

    this.setState({
      disableButtonR: newStep === -itemWidth * maxSteps,
      disableButtonL: newStep === 0,
      oneStep: (lastStep && infinite) ? 0 : newStep,
    });
  };

  scrollLeft = () => {
    const {
      itemWidth,
      step,
      infinite,
      images,
      frameSize,
    } = this.props;
    const { disableButtonL, oneStep } = this.state;
    let { lastStep } = this.state;

    if (disableButtonL && infinite === false) {
      return;
    }

    let newStep = oneStep + itemWidth * step;

    newStep = Math.min(newStep, 0);

    if (disableButtonL && infinite) {
      lastStep = true;
      newStep = -itemWidth * (images.length - frameSize);
    }

    this.setState({
      disableButtonL: newStep === 0,
      disableButtonR: newStep
      === -itemWidth * (images.length - frameSize),
      oneStep: (lastStep && infinite)
        ? (-itemWidth * (images.length - frameSize))
        : newStep,
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;
    const { disableButtonR, disableButtonL, oneStep } = this.state;

    const startIndex = Math.max(0, -Math.floor(oneStep / itemWidth));
    const endIndex = Math.min(images.length - 1, startIndex + frameSize - 1);

    return (
      <div className="Carousel">
        <div style={{ width: itemWidth * frameSize, overflow: 'hidden' }}>
          <ul
            className="Carousel__list"
            style={{
              width: itemWidth * images.length,
              transform: `translate(${oneStep}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => {
              const isVisible = index >= startIndex && index <= endIndex;

              return (
                <li
                  key={image}
                  style={{
                    width: itemWidth,
                    visibility: isVisible ? 'visible' : 'hidden',
                  }}
                >
                  <img
                    src={image}
                    alt={(index + 1).toString()}
                    width={itemWidth}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="Carousel__buttons"
          style={{ width: itemWidth * frameSize }}
        >
          <button
            type="button"
            aria-label="Prev"
            className={`Carousel__button Carousel__button--left ${(disableButtonL && infinite === false) ? 'Carousel__button--disable' : ''}`}
            onClick={this.scrollLeft}
          />
          <button
            type="button"
            aria-label="Next"
            data-cy="next"
            className={`Carousel__button Carousel__button--right ${(disableButtonR && infinite === false) ? 'Carousel__button--disable' : ''}`}
            onClick={this.scrollRight}
          />
        </div>
      </div>
    );
  }
}
