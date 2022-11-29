import React from 'react';
import './Carousel.scss';

type State = {
  position: number;
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

class Carousel extends React.Component < Props, State > {
  state = {
    position: 0,
  };

  calcStepWidth = () => {
    const { itemWidth, step } = this.props;

    return itemWidth * step;
  };

  calcMaxRight = () => {
    const { images, itemWidth, frameSize } = this.props;

    return (images.length * -itemWidth) + (itemWidth * frameSize);
  };

  clickNext = () => {
    const { position } = this.state;
    const { infinite } = this.props;

    const maxRight = this.calcMaxRight();
    const stepWidth = this.calcStepWidth();
    const currentLeft = ((position - stepWidth) < maxRight)
      ? maxRight
      : position - stepWidth;

    this.setState({
      position: (position === maxRight && infinite)
        ? 0
        : currentLeft,
    });
  };

  clickPrev = () => {
    const { position } = this.state;
    const { infinite } = this.props;

    const maxRight = this.calcMaxRight();
    const stepWidth = this.calcStepWidth();
    const currentLeft = ((position + stepWidth) > 0)
      ? 0
      : position + stepWidth;

    this.setState({
      position: (position === 0 && infinite)
        ? maxRight
        : currentLeft,
    });
  };

  render() {
    const { position } = this.state;

    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    return (
      <div className="carousel">
        <div
          className="carousel__wraper"
          style={{
            width: `${frameSize * itemWidth}px`,
            height: `${itemWidth}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              left: `${position}px`,
              transition: `${animationDuration}ms`,
            }}
          >
            {
              images.map((image, i) => {
                return (
                  <li
                    key={image}
                    className="carousel__item"
                    style={{
                      width: `${itemWidth}px`,
                      height: `${itemWidth}px`,
                    }}
                  >
                    <img
                      src={image}
                      alt={`${i + 1}`}
                    />
                  </li>
                );
              })
            }
          </ul>
        </div>

        <div className="carousel__buttons">
          <button
            className="carousel__button"
            type="button"
            onClick={this.clickPrev}
            disabled={(!infinite && position === 0) && true}
          >
            &#8592;
          </button>

          <button
            className="carousel__button"
            type="button"
            onClick={this.clickNext}
            disabled={(!infinite && position === this.calcMaxRight()) && true}
          >
            &#8594;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
