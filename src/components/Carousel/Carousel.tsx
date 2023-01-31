import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number
  animationDuration: number,
  infinite: boolean,
};

  type State = {
    index: number,
  };

export class Carousel extends React.Component<Props, State> {
  state = { index: 0 };

  nextButton = () => {
    let newIndex: number;
    const {
      step,
      images,
      frameSize,
      infinite,
    } = this.props;
    const { index } = this.state;

    if (infinite) {
      if (index + frameSize === images.length) {
        newIndex = 0;
      } else if (index + frameSize > images.length - step) {
        newIndex = images.length - frameSize;
      } else {
        newIndex = index + step;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    } else {
      if (index + frameSize > images.length - step) {
        newIndex = images.length - frameSize;
      } else {
        newIndex = step + index;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    }
  };

  prevButton = () => {
    let newIndex:number;
    const {
      step,
      images,
      frameSize,
      infinite,
    } = this.props;
    const { index } = this.state;

    if (infinite) {
      if (index === 0) {
        newIndex = images.length - frameSize;
      } else if (index < step) {
        newIndex = 0;
      } else {
        newIndex = index - step;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    } else {
      if (index === 0 || index < step) {
        newIndex = 0;
      } else {
        newIndex = index - step;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;
    const { index } = this.state;

    return (
      <>
        <div
          className="carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(-${index * itemWidth}px)`,
              transition: `transform ${animationDuration}ms linear`,
            }}
          >
            {
              images.map(image => (
                <li className="carousel__item" key={image}>
                  <img
                    className="carousel__img"
                    src={image}
                    alt={`${index} + 1`}
                    width={`${itemWidth}px`}
                  />
                </li>
              ))
            }
          </ul>

          <div className="carousel__buttons-container">
            <button
              className="carousel__button carousel__button--prev"
              type="button"
              onClick={this.prevButton}
            >
              <img
                src="./img/arrow-left.png"
                alt="Next button"
                width="50"
              />
            </button>

            <button
              className="carousel__button carousel__button--next"
              type="button"
              data-cy="next"
              onClick={this.nextButton}
            >
              <img
                src="./img/arrow-right.png"
                alt="Next button"
                width="50"
              />
            </button>
          </div>
        </div>
      </>
    );
  }
}
