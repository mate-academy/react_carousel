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
        <div>
          <ul
            className="Carousel__list"
            style={{
              borderRadius: `${itemWidth}px`,
              border: '6px solid grey',
            }}
          >
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
        </div>

        <div>
          <button
            disabled={currentItemIndex <= 0 && !infinity}
            type="button"
            onClick={this.handleButton(-step)}
          >
            Prev item
          </button>

          <button
            data-cy="next"
            disabled={
              currentItemIndex >= images.length - frameSize && !infinity
            }
            type="button"
            onClick={this.handleButton(step)}
          >
            Next item
          </button>
        </div>
      </div>
    );
  }
}
