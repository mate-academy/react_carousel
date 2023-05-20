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

export class Carousel extends React.Component<Props, State> {
  state = {
    currentItemIndex: 0,
  };

  handleButton = (step: number) => () => {
    const { images, frameSize } = this.props;
    const { currentItemIndex } = this.state;
    const lastItemIndex = images.length - frameSize;
    const firstItemIndex = 0;
    let nextItemIndex = currentItemIndex + step;

    if (step < 0) {
      if (currentItemIndex === firstItemIndex) {
        nextItemIndex = lastItemIndex;
      } else if (nextItemIndex < firstItemIndex) {
        nextItemIndex = firstItemIndex;
      }
    }

    if (step > 0) {
      if (currentItemIndex === lastItemIndex) {
        nextItemIndex = firstItemIndex;
      } else if (nextItemIndex > lastItemIndex) {
        nextItemIndex = lastItemIndex;
      }
    }

    this.setState(() => ({
      currentItemIndex: nextItemIndex,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.props;

    const { currentItemIndex } = this.state;

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
            images.map((img, index) => {
              return (
                <li
                  className="Carousel__item"
                  key={img}
                  style={{
                    transform: `translateX(${-currentItemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    width={itemWidth}
                    src={img}
                    alt={`emoji-${index + 1}`}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__btn">
          <button
            className="Carousel__button"
            disabled={currentItemIndex <= 0 && !infinity}
            type="button"
            onClick={this.handleButton(-step)}
          >
            Prev
          </button>

          <button
            className="Carousel__button"
            data-cy="next"
            disabled={
              currentItemIndex >= images.length - frameSize && !infinity
            }
            type="button"
            onClick={this.handleButton(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
