/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
};

type State = {
  currPos: number
};

class Carousel extends React.Component<Props, State> {
  state = {
    currPos: 0,
  };

  handleBtn = (step: number) => {
    const { currPos } = this.state;
    const { images, frameSize } = this.props;
    const firstPos = 0;
    const lastPos = -images.length + frameSize;
    let nextPos = currPos + step;

    if (step < 0) {
      nextPos = (currPos === lastPos)
        ? 0
        : Math.max(currPos + step, lastPos);
    }

    if (step > 0) {
      nextPos = (currPos === firstPos)
        ? lastPos
        : Math.min(currPos + step, firstPos);
    }

    this.setState({ currPos: nextPos });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const listStyles = {
      width: `${frameSize * itemWidth}px`,
      transition: `all ${animationDuration}ms`,
    };

    const imageStyles = {
      width: `${itemWidth}px`,
      transform: `translateX(${this.state.currPos * itemWidth}px)`,
      transition: `all ${animationDuration}ms`,
    };

    return (
      <div className="Carousel App__carousel">
        <ul className="Carousel__list" style={listStyles}>
          {images.map(image => {
            const key = image[image.length - 5];

            return (
              <li className="Carousel__item" key={key}><img src={image} alt={key} style={imageStyles} /></li>
            );
          })}
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
