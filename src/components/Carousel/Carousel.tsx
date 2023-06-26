/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
};

type CarouselState = {
  currPos: number
};

class Carousel extends React.Component<CarouselProps, CarouselState> {
  state = {
    currPos: 0,
  };

  handleBtn = (step: number) => {
    const { currPos } = this.state;
    const { images, frameSize } = this.props;

    const lastPos = -images.length + frameSize;
    let nextPos = currPos + step;

    nextPos = Math.max(nextPos, lastPos);
    nextPos = Math.min(nextPos, 0);

    if (step < 0 && currPos === lastPos) {
      nextPos = 0;
    }

    if (step > 0 && currPos === 0) {
      nextPos = lastPos;
    }

    this.setState({ currPos: nextPos });
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { images, step, frameSize, itemWidth, animationDuration, infinite } = this.props;

    const listStyles = {
      width: `${frameSize * itemWidth}px`,
      transition: `all ${animationDuration}ms`,
    };

    return (
      <div className="Carousel App__carousel">
        <ul className="Carousel__list" style={listStyles}>
          {images.map(image => (
            <li className="Carousel__item" key={image[image.length - 5]}>
              <img
                src={image}
                alt="Carousel emoji"
                style={{
                  width: `${itemWidth}px`,
                  transform: `translateX(${this.state.currPos * itemWidth}px)`,
                  transition: `all ${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={(this.state.currPos === 0) && !infinite}
            onClick={() => this.handleBtn(step)}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            disabled={(this.state.currPos === (images.length - frameSize) * -1) && !infinite}
            onClick={() => this.handleBtn(-step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
export default Carousel;
