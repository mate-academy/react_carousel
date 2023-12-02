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
  disableRightButton: boolean;
  disableLeftButton: boolean;
  oneStep: number;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    disableRightButton: false,
    disableLeftButton: true,
    oneStep: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.itemWidth !== this.props.itemWidth) {
      const { itemWidth } = this.props;

      this.setState((prevState) => ({
        oneStep: prevState.oneStep * (itemWidth / prevProps.itemWidth),
      }));
    }
  }

  scrollRight = () => {
    const {
      itemWidth,
      step,
      infinite,
      images,
      frameSize,
    } = this.props;
    const { disableRightButton, oneStep } = this.state;
    const maxSteps = images.length - frameSize;

    if (disableRightButton && infinite === false) {
      return;
    }

    let newStep = oneStep - itemWidth * step;

    newStep = Math.max(newStep, -itemWidth * maxSteps);

    if (disableRightButton && infinite) {
      newStep = 0;
    }

    this.setState({
      disableRightButton: newStep === -itemWidth * maxSteps,
      disableLeftButton: newStep === 0,
      oneStep: (disableRightButton && infinite) ? 0 : newStep,
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
    const { disableLeftButton, oneStep } = this.state;

    if (disableLeftButton && infinite === false) {
      return;
    }

    let newStep = oneStep + itemWidth * step;

    newStep = Math.min(newStep, 0);

    if (disableLeftButton && infinite) {
      newStep = -itemWidth * (images.length - frameSize);
    }

    this.setState({
      disableLeftButton: newStep === 0,
      disableRightButton: newStep
      === -itemWidth * (images.length - frameSize),
      oneStep: (disableLeftButton && infinite)
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
    const { disableRightButton, disableLeftButton, oneStep } = this.state;

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
                    visibility: isVisible ? 'visible' : 'hidden',
                    transition: `visibility ${animationDuration}ms`,
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
            className={`Carousel__button Carousel__button--left ${(disableLeftButton && infinite === false) ? 'Carousel__button--disable' : ''}`}
            onClick={this.scrollLeft}
          />
          <button
            type="button"
            aria-label="Next"
            data-cy="next"
            className={`Carousel__button Carousel__button--right ${(disableRightButton && infinite === false) ? 'Carousel__button--disable' : ''}`}
            onClick={this.scrollRight}
          />
        </div>
      </div>
    );
  }
}
