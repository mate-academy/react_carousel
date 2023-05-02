import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinity: boolean,
};

type State = {
  currentItemIndex: number,
};

export class Carousel extends React.Component <Props, State> {
  state = {
    currentItemIndex: 0,
  };

  handlerButton = (step: number) => () => {
    const { images, frameSize } = this.props;
    const { currentItemIndex } = this.state;
    const firstItemIndex = 0;
    const lastItemIndex = images.length - frameSize;
    let nextItemIndex = currentItemIndex + step;

    if (step > 0) {
      if (currentItemIndex === lastItemIndex) {
        nextItemIndex = firstItemIndex;
      } else if (nextItemIndex > lastItemIndex) {
        nextItemIndex = lastItemIndex;
      }
    }

    if (step < 0) {
      if (currentItemIndex === firstItemIndex) {
        nextItemIndex = lastItemIndex;
      } else if (nextItemIndex < firstItemIndex) {
        nextItemIndex = firstItemIndex;
      }
    }

    this.setState(() => ({
      currentItemIndex: nextItemIndex,
    }));
  };

  render() {
    const { currentItemIndex } = this.state;
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {
            images.map((el, index) => {
              return (
                <li
                  className="Carousel__item"
                  key={el}
                  style={{
                    transform: `translateX(${-currentItemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    src={el}
                    alt={`icon-${index + 1}`}
                    width={itemWidth}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            disabled={currentItemIndex <= 0 && !infinity}
            onClick={this.handlerButton(-step)}
          >
            Prev
          </button>

          <button
            className="Carousel__button"
            data-cy="next"
            type="button"
            disabled={
              currentItemIndex >= images.length - frameSize
              && !infinity
            }
            onClick={this.handlerButton(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
