import { Component } from 'react';
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

export class Carousel extends Component<Props, State> {
  state = {
    currentItemIndex: 0,
  };

  handleButton = (step: number) => () => {
    const { images, frameSize } = this.props;
    const { currentItemIndex } = this.state;
    const lastItemIndex = images.length - frameSize;
    const firstItemIndex = 0;
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
                  key={img}
                  className="Carousel__item"
                  style={{
                    transform: `translateX(${-currentItemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    src={img}
                    alt={`emoji-${index + 1}`}
                    width={itemWidth}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__btn">
          <button
            type="button"
            className="Carousel__button"
            disabled={currentItemIndex <= 0 && !infinity}
            onClick={this.handleButton(-step)}
          >
            Prev
          </button>
          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            disabled={
              currentItemIndex >= images.length - frameSize && !infinity
            }
            onClick={this.handleButton(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
