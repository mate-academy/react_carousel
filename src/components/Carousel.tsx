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

class Carousel extends Component<Props, State> {
  state = {
    currentItemIndex: 0,
  };

  handleNavButton = (step: number) => {
    const lastVisibleItemIndex
      = this.props.images.length - this.props.frameSize;
    const firstVisibleItemIndex = 0;
    let nextItemIndex = this.state.currentItemIndex + step;

    if (step < 0) {
      if (this.state.currentItemIndex === firstVisibleItemIndex) {
        nextItemIndex = lastVisibleItemIndex;
      } else if (nextItemIndex < firstVisibleItemIndex) {
        nextItemIndex = firstVisibleItemIndex;
      }
    }

    if (step > 0) {
      if (this.state.currentItemIndex === lastVisibleItemIndex) {
        nextItemIndex = firstVisibleItemIndex;
      } else if (nextItemIndex > lastVisibleItemIndex) {
        nextItemIndex = lastVisibleItemIndex;
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
              images.map((img) => {
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
                      alt={img}
                    />
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div>
          <button
            disabled={currentItemIndex <= 0 && !this.props.infinity}
            type="button"
            onClick={() => {
              this.handleNavButton(-step);
            }}
          >
            Prev item
          </button>
          <button
            data-cy="next"
            disabled={
              currentItemIndex >= images.length - frameSize && !infinity
            }
            type="button"
            onClick={() => {
              this.handleNavButton(step);
            }}
          >
            Next item
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
